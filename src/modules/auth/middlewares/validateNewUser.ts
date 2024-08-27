import { createFactory } from "hono/factory"
import { newUserSchema } from "../interfaces/newUser.interface"
import { sendErrorResponse } from "../../../utils/sendError"
import { ErrorName, zodErrorsMap } from "../../../errors/errors"
import { findUser } from "../repository/auth.repository"

const factory = createFactory()

const validateNewUserMiddleware = factory.createMiddleware(async (c, next) => {
	const body = await c.req.json()
	const newUser = newUserSchema.safeParse(body)

	//*Check if the user data is valid
	if (!newUser.success) {
		const firstError = newUser.error.errors.find(
			(err) =>
				typeof err.path[0] === "string" &&
				zodErrorsMap.has(err.path[0] as string),
		)

		if (firstError && typeof firstError.path[0] === "string") {
			const errorResponse = zodErrorsMap.get(
				firstError.path[0] as string,
			) as ErrorName
			return sendErrorResponse(c, errorResponse)
		}
	}

	//*Check if the email already exists
	const user = await findUser(body.email)
	if (!user.success) {
		return sendErrorResponse(c, ErrorName.SERVER_ERROR)
	}

	if (user.success && user.data) {
		return sendErrorResponse(c, ErrorName.EMAIL_ALREADY_EXISTS)
	}

	return next()
})

export { validateNewUserMiddleware }
