import moment from 'moment';

export const login = (credentials, option, fbLastAction, fbTotal) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log('login action');

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then((res) => {
      console.log('login sucess', option, typeof option);

      if (typeof option === "boolean") {
        firestore.collection('status').add({
          value: !option,
          createdAt: firestore.FieldValue.serverTimestamp(),
        })

        if (option) {
          const now = moment();
          console.log('now', now);
          const today = now.format('DD-MM-YYYY')
          const selectFbTotal = fbTotal.find(val => val.id === today);
          console.log('selectFbTotal', selectFbTotal);
          const fbLast = moment(fbLastAction.toDate(), "YYYYMMDD HH:mm:ss");
          const calculateDiff = now.diff(fbLast, "seconds");
          console.log('seconds passed', calculateDiff);

          if (!selectFbTotal) {
            console.log('no prev data, doing set');
            firestore.collection('total').doc(today).set({
              total: calculateDiff,
              createdAt: firestore.FieldValue.serverTimestamp()
            })
          } else {
            console.log('found ' + selectFbTotal.total + " seconds in db");
            firestore.collection('total').doc(today).update({
              total: calculateDiff + selectFbTotal.total,
              updatedAt: firestore.FieldValue.serverTimestamp()
            })
          }
        }
      }

      if (typeof option === "string") {
        firestore.collection('mode').add({
          value: option === 'manual' ? 'auto' : 'manual',
          createdAt: firestore.FieldValue.serverTimestamp(),
        })
      }
    }).catch((err) => {
      console.log('login error', err);
    })
  }
}
