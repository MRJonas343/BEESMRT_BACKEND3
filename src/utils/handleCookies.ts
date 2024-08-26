import { Context } from "hono"
import { deleteCookie, setSignedCookie } from "hono/cookie"

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

export { setNewCookie, updateCookie }
