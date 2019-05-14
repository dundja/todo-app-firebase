import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: "reservo-2f8ad.firebaseapp.com",
    databaseURL: "https://reservo-2f8ad.firebaseio.com",
    projectId: "reservo-2f8ad",
    storageBucket: "reservo-2f8ad.appspot.com",
    messagingSenderId: "229548823405",
    appId: "1:229548823405:web:3f6fc541d6c5e706"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
