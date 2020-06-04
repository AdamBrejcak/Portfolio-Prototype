import * as firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

firebase.firestore().enablePersistence({ synchronizeTabs: true });

export default firebaseApp.firestore();
