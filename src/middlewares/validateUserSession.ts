import { getCookie, sendErrorResponse, getIDFromToken } from "../utils"
import { createFactory } from "hono/factory"
import { deleteCookie } from "hono/cookie"
import { ErrorName } from "../errors"

const factory = createFactory()

const validateUserSessionMiddleware = factory.createMiddleware(
	async (c, next) => {
		const cookie = await getCookie(c)

		if (!cookie || !cookie.token) {
			deleteCookie(c, "token")
			return sendErrorResponse(c, ErrorName.INVALID_CREDENTIALS)
		}

		const result = await getIDFromToken(cookie.token)

		if (!result.success) {
			deleteCookie(c, "token")

			if (result.error === "TokenExpired") {
				return sendErrorResponse(c, ErrorName.TOKEN_EXPIRED)
			}
			return sendErrorResponse(c, ErrorName.INVALID_CREDENTIALS)
		}

		c.set("userId", result.data)

		return next()
	},
)

export { validateUserSessionMiddleware }
