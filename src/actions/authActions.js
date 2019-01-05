
export const login = (credentials, option, showNotification) => {
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
          showNotification('bc', 'success', 'Success, Status OFF')
        } else {
          showNotification('bc', 'success', 'Success, Status ON')
        }
      }

      if (typeof option === "string") {
        firestore.collection('mode').add({
          value: option === 'manual' ? 'auto' : 'manual',
          createdAt: firestore.FieldValue.serverTimestamp(),
        })
        showNotification('bc', 'success', `Success, Mode ${option === 'manual' ? 'Auto' : 'Manual'}`)
      }
    }).catch((err) => {
      console.log('login error', err);
      showNotification('bc', 'danger', `Wrong password!`)
    })
  }
}
