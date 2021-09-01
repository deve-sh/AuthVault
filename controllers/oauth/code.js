// Generates an OAuth Code with the login credentials, takes client id and secret and sends the user to the successful redirect.
import firebaseAdmin from "../../firebaseAdmin";
import firebase from "../../firebase";
import generateJWT from "../../helpers/generateJWT";

export default async function generateCode(req, res) {
	const error = (status = 400, message = "") =>
		res.status(status || 400).json({
			message: message || "Something went wrong. Please try again later.",
		});

	try {
		let { email, password } = req.body;
		let { clientId, clientSecret } = req.query;

		if (!email || !password || !clientId || !clientSecret)
			return error(
				400,
				"Incomplete information. Mandatory fields: email, password, clientId, clientSecret"
			);

		const client = (
			await firebaseAdmin
				.firestore()
				.collection("oauthclients")
				.where("clientId", "==", clientId)
				.where("clientSecret", "==", clientSecret)
				.limit(1)
				.get()
		).docs[0];

		if (!client || !client.data || !client.data() || !client.data().redirectURL)
			return error(404, "Client Not Found");

		await firebase.auth().signInWithEmailAndPassword(email, password);
		const user = firebase.auth().currentUser;
		await firebase.auth().signOut();

		// User is valid.
		// Generate an OAuth Code of verification for the user.
		let codeParams = {
			clientId,
			uid: user.uid,
			grantedAt: new Date().getTime(),
		};
		let codeJWT = generateJWT(
			codeParams,
			Math.floor(new Date().getTime() / 1000) + 3 * 60 // Code expires 3 minutes from now.
		);

		const redirectURL = new URL(client.data().redirectURL);
		redirectURL.searchParams.set("code", codeJWT);

		return res.redirect(redirectURL);
	} catch (err) {
		if (process.env.NODE_ENV !== "production") console.log(err);
		return error(400, err.message);
	}
}
