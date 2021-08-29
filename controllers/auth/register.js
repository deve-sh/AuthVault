import firebaseAdmin from "../../firebaseAdmin";

export default async function register(req, res) {
	const error = (status = 400, message = "F") =>
		res.status(status || 400).json({
			message: message || "Something went wrong. Please try again later.",
		});

	try {
		let { displayName, email, password, phoneNumber, photoURL } =
			req.body && req.body.user ? req.body.user : {};

		if (!displayName || !email || !password)
			return error(
				400,
				"Incomplete information. Mandatory fields: email, password and displayName"
			);

		const userRecord = await firebaseAdmin.auth().createUser({
			email,
			emailVerified: false,
			phoneNumber: phoneNumber || "",
			password,
			displayName,
			photoURL: photoURL || "",
			disabled: false,
		});

		return res.status(201).json({
			message: "Successfully created user",
			user: userRecord.toJSON(),
		});
	} catch (err) {
		if (process.env.NODE_ENV !== "production") console.log(err);
		return error(500, err.message);
	}
}
