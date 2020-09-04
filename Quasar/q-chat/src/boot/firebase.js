import * as firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  databaseURL: process.env.VUE_APP_databaseURL,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
  measurementId: process.env.VUE_APP_measurementId
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }
