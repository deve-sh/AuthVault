import firebaseAdmin from "../../firebaseAdmin";

export default async function loginUser(req, res) {
	const error = (status = 400, message = "") =>
		res
			.status(status || 400)
			.send(message || "Something went wrong. Please try again later.");

	try {
		let { clientId } = req.query;

		if (!clientId)
			return error(400, "Incomplete information. Mandatory fields: clientId");

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

		let nextRedirectURL = `${req.baseUrl}/code?clientId=${clientId}`;

		if (!req.session.uid) {
			// User isn't logged in via session. Show the login form.
			let loginHTML = `
            <form action="${nextRedirectURL}" style="text-align: center;" method="post">
				<h3>${client.data().name}</h3>
				<p>Wants to access your basic information like email and name</p>
				<p>Login to Your Account to provide the access.</p>
				<br />
                <input type="email" placeholder="Email" name="email" required />
                <br />
				<br />
                <input type="password" placeholder="Password" name="password" required />
                <br />
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
