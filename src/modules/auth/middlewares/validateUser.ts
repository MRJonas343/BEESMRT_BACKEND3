import { createFactory } from "hono/factory"
import { sendErrorResponse } from "../../../utils/sendError"
import { ErrorName, zodErrorsMap } from "../../../errors/errors"
import { findUser } from "../repository/auth.repository"
import { existingUserSchema } from "../interfaces/newUser.interface"
import { comparePassword } from "../../../utils"

const factory = createFactory()

const validateUserMiddleware = factory.createMiddleware(async (c, next) => {
	const body = await c.req.json()
	const newUser = existingUserSchema.safeParse(body)

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

	//*Check if the email exists
	const user = await findUser(body.email)
	if (!user.success) {
		return sendErrorResponse(c, ErrorName.SERVER_ERROR)
	}

	if (!user.data || !user.data.email) {
		return sendErrorResponse(c, ErrorName.USER_NOT_FOUND)
	}

	//*Check if the password is correct
	const hashedPassword = user.data.password!
	const isPasswordCorrect = await comparePassword(body.password, hashedPassword)

	if (!isPasswordCorrect) {
		return sendErrorResponse(c, ErrorName.INVALID_USER_PASSWORD)
	}
	return next()
})

export { validateUserMiddleware }
