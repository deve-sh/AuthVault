import firebaseAdmin from "../../firebaseAdmin";
import { v4 as uuid } from "uuid";

export default async function createOAuthClient(req, res) {
	const error = (status = 400, message = "") =>
		res.status(status || 400).json({
			message: message || "Something went wrong. Please try again later.",
		});

	try {
		if (!req.token || !req.token.uid) return error(401, "Unauthorized");

		let { name, description, homepage, redirectURL } =
			req.body && req.body.client ? req.body.client : {};

		if (!name || !description || !homepage || !redirectURL)
			return error(
				400,
				"Incomplete information. Mandatory fields: name, description, homepage, redirectURL"
			);

		// Generating client IDs and Client Secrets for the OAuth Client
		let clientId = uuid();
		let clientSecret = `${uuid()}${uuid()}${new Date().getTime()}`;

		// Save the client to the database.
		await firebaseAdmin.firestore().collection("oauthclients").doc().set({
			createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
			updatedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
			clientId,
			clientSecret,
			nUsers: 0,
			homepage,
			redirectURL,
			name,
			description,
			createdBy: req.token.uid,
		});

		return res.status(201).json({
			message: "Successfully created OAuth Client",
			client: {
				clientId,
				clientSecret,
				homepage,
				redirectURL,
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV !== "production") console.log(err);
		return error(400, err.message);
	}
}
