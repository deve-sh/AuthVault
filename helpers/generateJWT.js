import { sign } from "jsonwebtoken";

export default function generateJWT(
	params = {
		uid: null,
	},
	expires
) {
	try {
		const jwt = sign(
			{
				...params,
				exp: expires || Math.floor(Date.now() / 1000) + 60 * 60, // By default expires 1 hour from now.
			},
			process.env.JWT_SECRET
		);
		return jwt;
	} catch (err) {
		console.log(err);
		return null;
	}
}
