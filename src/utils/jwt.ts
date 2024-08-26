import * as jose from "jose"

// Convierte la clave secreta a Uint8Array
const encodedSecret = new TextEncoder().encode(Bun.env.JWTSECRET)

const createToken = async () => {
	const jwt = await new jose.SignJWT()
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime("10d")
		.sign(encodedSecret)

	return jwt
}

export { createToken }
