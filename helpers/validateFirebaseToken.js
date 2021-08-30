import firebaseAdmin from "../firebaseAdmin";

export default async function validateFirebaseToken(req, res, next) {
	try {
		let idToken = req.headers["authorization"] || req.headers["Authorization"];
		if (!idToken) throw new Error("Token missing from request.");
		let decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
		req.token = decodedToken;
		next();
	} catch (err) {
		if (process.env.NODE_ENV !== "production") console.log(err);
		return res.status(403).json({
			error: "Unauthorized",
		});
	}
}
