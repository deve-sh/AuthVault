// Gets token from code.
import firebaseAdmin from "../../firebaseAdmin";
import verifyJWT from "../../helpers/verifyJWT";
import generateJWT from "../../helpers/generateJWT";

export default async function getOAuthToken(req, res) {
	const error = (status = 400, message = "") =>
		res.status(status || 400).json({
			message: message || "Something went wrong. Please try again later.",
		});

	try {
		let { code, clientId, clientSecret } = req.query;

		if (!code || !clientId || !clientSecret)
			return error(
				400,
				"Incomplete information. Mandatory fields: code, clientId, clientSecret"
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

		let decodedCode = verifyJWT(code);
		if (!decodedCode || !decodedCode.uid) return error(403, "Unauthorized");

		let user = await firebaseAdmin.auth().getUser(decodedCode.uid);
		user = user.toJSON();

		const token = generateJWT({
			uid: decodedCode.uid,
			email: user.email,
			displayName: user.displayName,
			phoneNumber: user.phoneNumber,
		});

		return res.status(200).json({
			message: "OAuth Token Generated",
			token,
		});
	} catch (err) {
		if (process.env.NODE_ENV !== "production") console.log(err);
		return error(400, err.message);
	}
}
