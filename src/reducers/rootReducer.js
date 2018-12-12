import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import statusReducer from './statusReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  status: statusReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer;
