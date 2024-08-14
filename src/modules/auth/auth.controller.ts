import { Factory } from "hono/factory"
import exampleMiddleware from "../../middleware/example.middleware"
import { sendErrorResponse } from "../../utils/sendError"
import { ErrorName } from "../../errors/errors"

const factory = new Factory()

export const loginController = factory.createHandlers(async (c) => {
	//const body = await c.req.json()
	return sendErrorResponse(c, ErrorName.EMAIL_ALREADY_EXISTS)
})

export const signupController = factory.createHandlers(
	exampleMiddleware,
	(c) => {
		return c.json({ message: "Factory??" })
	},
)
