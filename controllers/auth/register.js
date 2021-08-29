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

		let userProperties = {
			email,
			emailVerified: false,
			password,
			displayName,
			disabled: false,
		};

        if(photoURL) userProperties.photoURL = photoURL;
        if(phoneNumber) userProperties.phoneNumber = phoneNumber;

		const userRecord = await firebaseAdmin.auth().createUser(userProperties);

        let userRecordToSend = { ...userRecord.toJSON() };
        delete userRecordToSend.metadata;
        delete userRecordToSend.tokensValidAfterTime;
        delete userRecordToSend.providerData;

		return res.status(201).json({
			message: "Successfully created user",
            id: userRecordToSend.uid,
			user: userRecordToSend,
		});
	} catch (err) {
		if (process.env.NODE_ENV !== "production") console.log(err);
		return error(400, err.message);
	}
}
