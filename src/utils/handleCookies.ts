import { Context } from "hono"
import { deleteCookie, setSignedCookie, getSignedCookie } from "hono/cookie"

/**
 * Sets a new cookie with the provided token.
 *
 * @param c - The context object.
 * @param token - The token to be stored in the cookie.
 * @returns A promise that resolves when the cookie is set.
 */
const setNewCookie = async (c: Context, token: string) => {
	return await setSignedCookie(c, "token", token, Bun.env.COOKIESECRET, {
		httpOnly: true,
		secure: Bun.env.ENV === "production",
		sameSite: "Lax" as const,
		expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
	})
}

/**
 * Updates the cookie with a new token.
 *
 * @param c - The context object.
 * @param token - The new token to set in the cookie.
 * @returns A promise that resolves once the cookie has been updated.
 */
const updateCookie = async (c: Context, token: string) => {
	deleteCookie(c, "token")
	await setNewCookie(c, token)
}

/**
 * Retrieves the cookie value from the provided context.
 *
 * @param c - The context object containing the necessary information.
 * @returns A promise that resolves to the cookie value.
 */
const getCookie = async (c: Context) => {
	const cookie = await getSignedCookie(c, Bun.env.COOKIESECRET!)
	return cookie
}

export { setNewCookie, updateCookie, getCookie }
