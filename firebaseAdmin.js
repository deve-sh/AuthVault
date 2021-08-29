import firebaseAdmin from "firebase-admin";

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert("./keys/service_account.json"),
});

export default firebaseAdmin;
