import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyChC62HAtPWAtFiJmcDlTGWwq_YFOjSNqE",
  authDomain: "protobike-1495735501799.firebaseapp.com",
  databaseURL: "https://protobike-1495735501799.firebaseio.com",
  projectId: "protobike-1495735501799",
  storageBucket: "protobike-1495735501799.appspot.com",
  messagingSenderId: "777348050122"
};
firebase.initializeApp(config);

export default firebase;
