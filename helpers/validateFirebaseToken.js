export default async function validateFirebaseToken(idToken) {
	try {
		let decodedToken = await auth.verifyIdToken(idToken);
		return decodedToken;
	} catch (err) {
		if (process.env.NODE_ENV !== "production") console.log(err);
		return null;
	}
}
