import { getCookie, validateJWT, sendErrorResponse } from "../utils"
import { createFactory } from "hono/factory"
import { deleteCookie } from "hono/cookie"
import { ErrorName } from "../errors/errors"

const factory = createFactory()

const validateUserSessionMiddleware = factory.createMiddleware(
	async (c, next) => {
		const cookie = await getCookie(c)

		if (!cookie || !cookie.token) {
			deleteCookie(c, "token")
			return sendErrorResponse(c, ErrorName.INVALID_CREDENTIALS)
		}

		const result = await validateJWT(cookie.token)

		if (!result.success && result.error === "TokenExpired") {
			deleteCookie(c, "token")
			return sendErrorResponse(c, ErrorName.TOKEN_EXPIRED)
		}

		if (!result.success) {
			return sendErrorResponse(c, ErrorName.INVALID_CREDENTIALS)
		}

		return next()
	},
)

export { validateUserSessionMiddleware }
