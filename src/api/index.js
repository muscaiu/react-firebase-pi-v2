const admin = require('firebase-admin');
var CronJob = require('cron').CronJob;
const Gpio = require('onoff').Gpio;
const relay = new Gpio(17, 'out');

var serviceAccount = require('../config/serviceAccount.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
var db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

var statusRef = db.collection('status');
var modeRef = db.collection('mode');

let ignoreExistingStateEntries = true;
let ignoreExistingModeEntries = true;
let mode = 'unititialized'


modeRef
  .orderBy('createdAt', 'desc')
  .limit(1)
  .onSnapshot(querySnapshot => {
    let changes = querySnapshot.docChanges()

    changes.forEach(change => {
      const changed = change.doc.data()
      if (!ignoreExistingStateEntries) {
        if (change.type === 'added') {

          if (changed.value === 'auto') {
            mode = 'auto'
            console.log('db mode set to auto');
          } else {
            mode = 'manual'
            console.log('db mode set to manual');
          }
        }
        if (change.type === 'modified') {
          console.log('Modified mode: ', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Removed mode: ', change.doc.data());
        }
      } else {
        mode = changed.value
        console.log('initial mode', changed.value)
        console.log('ignoreExistingModeEntries', ignoreExistingModeEntries)
      }
    });

    ignoreExistingModeEntries = false;
  });


statusRef
  .orderBy('createdAt', 'desc')
  .limit(1)
  .onSnapshot(querySnapshot => {
    let changes = querySnapshot.docChanges()

    changes.forEach(change => {
      const changed = change.doc.data()
      if (!ignoreExistingStateEntries) {
        if (change.type === 'added') {
          if (changed.value) {
            relay.writeSync(0); //turn relay on
            console.log('db event triggered: pompa started');
          } else {
            relay.writeSync(1); //turn relay off
            console.log('db event triggered: pompa stopped');
          }
        }
        if (change.type === 'modified') {
          console.log('Modified status: ', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Removed status: ', change.doc.data());
        }
      } else {
        console.log('initial status', changed.value)
      }
    });

    ignoreExistingStateEntries = false;
  });




//seconds(0-59), minutes(0-59), hours(0-23), day of month(1-31), months0-11, day of week(0-6)
const customMinute = 26;
const customHour = 0;
const startTime = new CronJob(`00 ${customMinute} ${customHour} * * *`, function () {
  if (mode === 'auto') {
    statusRef.add({
      value: true,
      createdAt: new Date()
    });
    console.log('pompa started by cron');
    relay.writeSync(0); //turn relay on
  } else {
    console.log('cant start auto because is currently in manual mode')
  }
});

const stopTime = new CronJob(`00 ${customMinute + 1} ${customHour} * * *`, function () {
  if (mode === 'auto') {
    statusRef.add({
      value: false,
      createdAt: new Date()
    });
    relay.writeSync(1); //turn relay off
    console.log('pompa stopped by cron');
  } else {
    console.log('cant stop auto because is currently in manual mode')
  }
});


startTime.start();
stopTime.start();