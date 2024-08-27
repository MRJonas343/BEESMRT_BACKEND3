import { Context } from "hono"
import { deleteCookie, setSignedCookie, getSignedCookie } from "hono/cookie"

const cookieSettings = {
	httpOnly: true,
	secure: Bun.env.ENV === "production",
	sameSite: "Lax" as const,
	expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
}

const setNewCookie = async (c: Context, token: string) => {
	await setSignedCookie(c, "token", token, Bun.env.COOKIESECRET, cookieSettings)
}

const updateCookie = async (c: Context, token: string) => {
	deleteCookie(c, "token")
	await setNewCookie(c, token)
}

const getCookie = async (c: Context) => {
	const cookie = await getSignedCookie(c, Bun.env.COOKIESECRET!)
	return cookie
}

export { setNewCookie, updateCookie, getCookie }
