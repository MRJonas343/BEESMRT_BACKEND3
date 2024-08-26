import { createFactory } from "hono/factory"
import { newUserSchema } from "../interfaces/newUser.interface"
import { sendErrorResponse } from "../../../utils/sendError"
import { ErrorName } from "../../../errors/errors"
import { zodErrorsMap } from "../../../errors/errors"

const factory = createFactory()

const validateNewUserMiddleware = factory.createMiddleware(async (c, next) => {
	const body = await c.req.json()
	const newUser = newUserSchema.safeParse(body)

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

	await next()
})

export { validateNewUserMiddleware }
