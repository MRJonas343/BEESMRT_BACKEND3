import { createFactory } from "hono/factory"
import { getCookie, validateJWT } from "../../../utils"
const factory = createFactory()

const validateUserSessionMiddleware = factory.createMiddleware(
	async (c, next) => {
		const cookie = await getCookie(c)

		if (!cookie || !cookie.token) {
			return next()
		}

		const result = await validateJWT(cookie.token)

		if (!result.success && result.error === "TokenExpired") {
			//*you need to refresh the token
		}

		if (!result.success) {
			//*the token is invalid, you win a 400 fuck you
		}

		return next()
	},
)

export { validateUserSessionMiddleware }
