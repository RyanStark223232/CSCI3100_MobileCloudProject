import firebase from "firebase/app";
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBPCAkZ-IwzGk5qA9EeJZ1d2UE-Y2iG8GU",
    authDomain: "nowhere-571c3.firebaseapp.com",
    projectId: "nowhere-571c3",
    storageBucket: "nowhere-571c3.appspot.com",
    messagingSenderId: "842619431453",
    appId: "1:842619431453:web:b58a52c404f0ba4764b4f4",
    measurementId: "G-HQMWYDH01Y"
};

const app = firebase.initializeApp(firebaseConfig)
export const auth = app.auth()
export default auth

// auth.createUserWithEmailAndPassword("potato@potato.com","potato1234")
