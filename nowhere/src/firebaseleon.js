import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBx6oKD5Kp8l0eFB0-dd5KL_1-aMMeZyHg",
  authDomain: "leon-trial2.firebaseapp.com",
  databaseURL: "https://leon-trial2-default-rtdb.firebaseio.com",
  projectId: "leon-trial2",
  storageBucket: "leon-trial2.appspot.com",
  messagingSenderId: "105503986493",
  appId: "1:105503986493:web:81bb62272a2c0a47db2b54"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;