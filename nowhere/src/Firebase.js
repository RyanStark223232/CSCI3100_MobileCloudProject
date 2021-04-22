
/*  
This is the backend module exporting the APIs for other modules 
to communication with the Firebase project server.
*/ 

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

//configuration of the Firebase project, to authenticate this software
const firebaseConfig = {
    apiKey: "AIzaSyBPCAkZ-IwzGk5qA9EeJZ1d2UE-Y2iG8GU",
    authDomain: "nowhere-571c3.firebaseapp.com",
    projectId: "nowhere-571c3",
    storageBucket: "nowhere-571c3.appspot.com",
    messagingSenderId: "842619431453",
    appId: "1:842619431453:web:b58a52c404f0ba4764b4f4",
    measurementId: "G-HQMWYDH01Y",
};

const app = firebase.initializeApp(firebaseConfig)
 //for user authentication
const auth = app.auth()
//for the use of realtime databse
const f_database = firebase.database() 
//for storing pictures in storage
const storage = firebase.storage(); 


export { app, storage, auth, f_database, firebase}
export default auth
