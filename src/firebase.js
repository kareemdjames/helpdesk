import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyArZ8Nw-wBip7a2Lgszu9QoK3OEOw5iECc',
  authDomain: 'swarf-eb.firebaseapp.com',
  databaseURL: 'https://swarf-eb.firebaseio.com',
  projectId: 'swarf-eb',
  storageBucket: 'swarf-eb.appspot.com',
  messagingSenderId: '946602163393'
};

export default firebase;

export const firebaseApp = firebase.initializeApp(config);
export const database = firebase.database();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();
