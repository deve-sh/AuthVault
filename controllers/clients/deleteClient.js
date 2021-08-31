import firebaseAdmin from "../../firebaseAdmin";

export default async function deleteOAuthClient(req, res) {
	const error = (status = 400, message = "") =>
		res.status(status || 400).json({
			message: message || "Something went wrong. Please try again later.",
		});

	try {
		if (!req.token || !req.token.uid) return error(401, "Unauthorized");

		let { clientId } = req.params;

		// Get the client from the database.
		let client = (
			await firebaseAdmin
				.firestore()
				.collection("oauthclients")
				.where("clientId", "==", clientId)
				.limit(1)
				.get()
		).docs[0];

		if (!client || !client.data || req.token.uid !== client.data().createdBy)
			return error(404, "Client Not Found");

		let clientData = client.data();
		clientData.updatedAt = clientData.updatedAt.toDate();
		clientData.createdAt = clientData.createdAt.toDate();

		await client.ref.delete();

		return res.status(200).json({
			message: "Successfully removed OAuth Client",
			client: clientData,
		});
	} catch (err) {
		if (process.env.NODE_ENV !== "production") console.log(err);
		return error(400, err.message);
	}
}
