import firebaseAdmin from "../../firebaseAdmin";

export default async function listOAuthClients(req, res) {
	const error = (status = 400, message = "") =>
		res.status(status || 400).json({
			message: message || "Something went wrong. Please try again later.",
		});

	try {
		if (!req.token || !req.token.uid) return error(401, "Unauthorized");

		// Get the client from the database.
		let clients = await firebaseAdmin
			.firestore()
			.collection("oauthclients")
			.where("createdBy", "==", req.token.uid)
			.get();

		// Processing Timestamps
		let clientsToReturn = clients.docs.map((client) => ({
			...client.data(),
			updatedAt: client.data().updatedAt.toDate(),
			createdAt: client.data().createdAt.toDate(),
		}));

		return res.status(200).json({
			message: "Successfully fetched OAuth Clients",
			clients: clientsToReturn,
		});
	} catch (err) {
		if (process.env.NODE_ENV !== "production") console.log(err);
		return error(400, err.message);
	}
}
