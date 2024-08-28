import { Context } from "hono"
import { deleteCookie, setSignedCookie, getSignedCookie } from "hono/cookie"

const setNewCookie = async (c: Context, token: string) => {
	return await setSignedCookie(c, "token", token, Bun.env.COOKIESECRET, {
		httpOnly: true,
		secure: Bun.env.ENV === "production",
		sameSite: "Lax" as const,
		expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
	})
}

const updateCookie = async (c: Context, token: string) => {
	await deleteCookie(c, "token")
	await setNewCookie(c, token)
}

const getCookie = async (c: Context) => {
	const cookie = await getSignedCookie(c, Bun.env.COOKIESECRET!)
	return cookie
}

export { setNewCookie, updateCookie, getCookie }
