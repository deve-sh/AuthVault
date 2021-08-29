import firebase from "firebase/app";
import "firebase/auth";

const config = {
	apiKey: process.env.FIREBASE_apiKey,
	authDomain: process.env.FIREBASE_authDomain,
	projectId: process.env.FIREBASE_projectId,
	appId: process.env.FIREBASE_appId,
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
