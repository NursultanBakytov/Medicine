import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const fire = firebase.initializeApp({
  apiKey: 'AIzaSyD925v8v2_1FcBlFljh0FeFZ9mi2pM_Lp4',
  authDomain: 'calmify-3ae8e.firebaseapp.com',
  // databaseURL: 'https://calmify-3ae8e.firebaseio.com',
  projectId: 'calmify-3ae8e',
  storageBucket: 'calmify-3ae8e.appspot.com',
  messagingSenderId: '1051942891914',
  appId: '1:1051942891914:web:ea8e9b4f64aac666f91873',
  measurementId: 'G-RT1KJDXQGC',
})

const db = firebase.firestore()
const storage = firebase.storage()
export { db, storage, fire as default }
