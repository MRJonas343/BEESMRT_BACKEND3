import { jwtVerify, SignJWT } from "jose"
import { JWTExpired } from "jose/errors"
import { Result } from "./ResultType"

const encodedSecret = new TextEncoder().encode(Bun.env.JWTSECRET)

const createToken = async (userId: string) => {
	const jwt = await new SignJWT({ userId })
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000))
		.sign(encodedSecret)

	return jwt
}

const getIDFromToken = async (token: string): Promise<Result<string>> => {
	try {
		const jwt = await jwtVerify(token, encodedSecret)

		return { success: true, data: String(jwt.payload.userId) }
	} catch (error: unknown) {
		if (error instanceof JWTExpired) {
			return { success: false, error: "TokenExpired" }
		}

		return { success: false, error: "Invalidtoken" }
	}
}

export { createToken, getIDFromToken }
