import { Context } from "hono"
import { deleteCookie, setSignedCookie, getSignedCookie } from "hono/cookie"
/**
 * Sets the access and refresh tokens in the cookies.
 *
 * @param c - The context object.
 * @param accessToken - The access token to set in the cookie.
 * @param refreshToken - The refresh token to set in the cookie.
 * @returns A promise that resolves once the cookies have been set.
 */
const setAuthCookies = async (
	c: Context,
	accessToken: string,
	refreshToken: string,
) => {
	await setSignedCookie(c, "accessToken", accessToken, Bun.env.COOKIESECRET, {
		httpOnly: true,
		secure: Bun.env.ENV === "production",
		sameSite: "Lax",
		expires: new Date(Date.now() + 15 * 60 * 1000),
	})

	await setSignedCookie(c, "refreshToken", refreshToken, Bun.env.COOKIESECRET, {
		httpOnly: true,
		secure: Bun.env.ENV === "production",
		sameSite: "Lax",
		expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
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
	deleteCookie(c, "accessToken")
	await setSignedCookie(c, "accessToken", token, Bun.env.COOKIESECRET, {
		httpOnly: true,
		secure: Bun.env.ENV === "production",
		sameSite: "Lax",
		expires: new Date(Date.now() + 15 * 60 * 1000),
	})
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

export { setAuthCookies, updateCookie, getCookie }
