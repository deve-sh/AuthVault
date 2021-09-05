import { verify } from "jsonwebtoken";

export default function verifyJWT(token) {
	try {
		const decoded = verify(token, process.env.JWT_SECRET);
		return decoded;
	} catch (err) {
		if (process.env.NODE_ENV !== "production") console.log(err);
		return null;
	}
}
