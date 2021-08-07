import firebase from "firebase/app";
import "firebase/auth";

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyAlxl9QUzxuShoMe9ppEyRQ1q7x-JWCrP0",
    authDomain: "bubblezoo-79736.firebaseapp.com",
    projectId: "bubblezoo-79736",
    storageBucket: "bubblezoo-79736.appspot.com",
    messagingSenderId: "92252477474",
    appId: "1:92252477474:web:afddbace65905deb5b127b",
    measurementId: "G-G99BGLQ15S",
  });
}

firebase.auth().useDeviceLanguage();

export default firebase;
