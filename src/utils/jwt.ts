import { jwtVerify, SignJWT } from "jose"
import { JWTExpired } from "jose/errors"
import { Result } from "./ResultType"

const encodedSecret = new TextEncoder().encode(Bun.env.JWTSECRET)

/**
 * Creates a JSON Web Token (JWT) for the given user ID.
 *
 * @param userId - The ID of the user.
 * @returns The generated JWT.
 */
const createToken = async (userId: string) => {
	const jwt = await new SignJWT({ userId })
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000))
		.sign(encodedSecret)

	return jwt
}

/**
 * Retrieves the user ID from a JWT token.
 *
 * @param token - The JWT token to extract the user ID from.
 * @returns A promise that resolves to a Result object containing the user ID if successful, or an error message if unsuccessful.
 */
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
