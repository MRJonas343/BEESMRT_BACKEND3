import { createFactory } from "hono/factory"
import { deleteCookie } from "hono/cookie"
import { ErrorName } from "@error"
import { getCookie, getIDFromToken, sendErrorResponse } from "@utils"

const factory = createFactory()

const validateUserSessionMiddleware = factory.createMiddleware(
	async (c, next) => {
		const cookies = await getCookie(c)
		const accessToken = cookies?.accessToken
		const refreshToken = cookies?.refreshToken

		if (!accessToken && refreshToken) {
			return sendErrorResponse(c, ErrorName.TOKEN_EXPIRED)
		}

		if (!refreshToken) {
			deleteCookie(c, "accessToken")
			deleteCookie(c, "refreshToken")
			return sendErrorResponse(c, ErrorName.INVALID_CREDENTIALS)
		}

		const result = await getIDFromToken(String(accessToken))

		if (!result.success) {
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
