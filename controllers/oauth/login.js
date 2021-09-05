// Generates an OAuth Code with the login credentials, takes client id and secret and sends the user to the successful redirect.
import firebaseAdmin from "../../firebaseAdmin";

export default async function loginUser(req, res) {
	const error = (status = 400, message = "") =>
		res
			.status(status || 400)
			.send(message || "Something went wrong. Please try again later.");

	try {
		let { clientId, clientSecret } = req.query;

		if (!clientId || !clientSecret)
			return error(
				400,
				"Incomplete information. Mandatory fields: clientId, clientSecret"
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

		let nextRedirectURL = `${req.baseUrl}/code?clientId=${clientId}&clientSecret=${clientSecret}`;

		if (!req.session.uid) {
			// User isn't logged in via session. Show the login form.
			let loginHTML = `
            <form action="${nextRedirectURL}" method="POST">
                <input type="email" placeholder="Email" name="email" required />
                <br />
                <input type="possword" placeholder="Password" name="password" required />
                <br />
                <button type="submit">Login</button>
            </form>`;
			return res.send(loginHTML);
		} else return res.redirect(nextRedirectURL);
	} catch (err) {
		if (process.env.NODE_ENV !== "production") console.log(err);
		return error(400, err.message);
	}
}
