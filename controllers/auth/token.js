import firebaseAdmin from "../../firebaseAdmin";
import firebase from "../../firebase";

export default async function getToken(req, res) {
	const error = (status = 400, message = "") =>
		res.status(status || 400).json({
			message: message || "Something went wrong. Please try again later.",
		});

	try {
		let { email, password } = req.body;

		if (!email || !password)
			return error(
				400,
				"Incomplete information. Mandatory fields: email, password and displayName"
			);

		await firebase.auth().signInWithEmailAndPassword(email, password);
		let uid = firebase.auth().currentUser.uid;
		await firebase.auth().signOut();

		return res.status(200).json({
			message: "Successfully fetched token",
			token: await firebaseAdmin.auth().createCustomToken(uid),
		});
	} catch (err) {
		if (process.env.NODE_ENV !== "production") console.log(err);
		return error(400, err.message);
	}
}
