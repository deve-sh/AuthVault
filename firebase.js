import firebase from "firebase/app";
import "firebase/auth";

const config = {
	apiKey: process.env.FIRBEASE_apiKey,
	authDomain: process.env.FIRBEASE_authDomain,
	projectId: process.env.FIRBEASE_projectId,
	appId: process.env.FIRBEASE_appId,
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
