// Final step of the OAuth Pipeline, to get user details from token generated in the OAuth Process.
import firebaseAdmin from "../../firebaseAdmin";
import verifyJWT from "../../helpers/verifyJWT";

export default async function getUserDetails(req, res) {
	const error = (status = 400, message = "") =>
		res.status(status || 400).json({
			message: message || "Something went wrong. Please try again later.",
		});

	try {
		let { token, clientId } = req.query;

		if (!token || !clientId)
			return error(
				400,
				"Incomplete information. Mandatory fields: token, clientId"
			);

		const client = (
			await firebaseAdmin
				.firestore()
				.collection("oauthclients")
				.where("clientId", "==", clientId)
				.limit(1)
				.get()
		).docs[0];

		if (!client || !client.data || !client.data() || !client.data().redirectURL)
			return error(404, "Client Not Found");

		let decodedToken = verifyJWT(token);
		if (
			!decodedToken ||
			!decodedToken.uid ||
			!decodedToken.clientId ||
			decodedToken.clientId !== clientId
		)
			return error(403, "Unauthorized");

		let user = await firebaseAdmin.auth().getUser(decodedToken.uid);
		user = user.toJSON();

		return res.status(200).json({
			message: "Fetched User Details Successfully",
			user: {
				displayName: user.displayName || decodedToken.displayName,
				disabled: user.disabled,
				photoURL: user.photoURL || decodedToken.photoURL,
				email: user.email || decodedToken.email,
				phoneNumber: user.phoneNumber || decodedToken.phoneNumber,
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV !== "production") console.log(err);
		return error(400, err.message);
	}
}
