import jwt from "jsonwebtoken";

export default function verifyJWT(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded;
	} catch (err) {
		if (process.env.NODE_ENV !== "production") console.log(err);
		return null;
	}
}
