import { sign } from "jsonwebtoken";

export default function generateJWT(
	params = {
		uid: null,
	},
	expires
) {
	return sign(
		{
			...params,
			exp: expires || Math.floor(Date.now() / 1000) + 60 * 60, // By default expires 1 hour from now.
		},
		process.env.JWT_SECRET,
		{ algorithm: "RS256" }
	);
}
