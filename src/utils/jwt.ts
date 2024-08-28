import { jwtVerify, SignJWT } from "jose"
import { JWTExpired } from "jose/errors"
import { Result } from "./ResultType"

const encodedSecret = new TextEncoder().encode(Bun.env.JWTSECRET)

const createToken = async () => {
	const jwt = await new SignJWT()
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000))
		.sign(encodedSecret)

	return jwt
}

const validateJWT = async (token: string): Promise<Result<boolean>> => {
	try {
		const jwt = await jwtVerify(token, encodedSecret)

		return { success: true }
	} catch (error: unknown) {
		if (error instanceof JWTExpired) {
			return { success: false, error: "TokenExpired" }
		}

		return { success: false, error: "Invalidtoken" }
	}
}

export { createToken, validateJWT }
