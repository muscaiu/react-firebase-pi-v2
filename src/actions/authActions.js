
export const login = (credentials, option, notify) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then((res) => {

      if (typeof option === "boolean") {
        firestore.collection('status').add({
          value: !option,
          createdAt: firestore.FieldValue.serverTimestamp(),
        })

        if (option) {
          notify(`Success, Status OFF`, 'bc', 'success')
        } else {
          notify(`Success, Status ON`, 'bc', 'success')
        }
      }

      if (typeof option === "string") {
        firestore.collection('mode').add({
          value: option === 'manual' ? 'auto' : 'manual',
          createdAt: firestore.FieldValue.serverTimestamp(),
        })
        notify(`Success, Mode ${option === 'manual' ? 'Auto' : 'Manual'}`, 'bc', 'success')
      }
    }).catch((err) => {
      console.log('login error', err);
      notify(`Wrong password!`, 'bc', 'danger')
    })
  }
}
