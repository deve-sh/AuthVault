import jwt from "jsonwebtoken";

export default async function generateJWT(
	params = {
		uid: null,
	},
	expires = Math.floor(Date.now() / 1000) + 60 * 60 // By default expires 1 hour from now.
) {
	return jwt.sign(
		{ ...params, exp: expires || Math.floor(Date.now() / 1000) + 60 * 60 },
		process.env.JWT_SECRET,
		{ algorithm: "RS256" }
	);
}
