import { Factory } from "hono/factory"
import { sendErrorResponse } from "../../utils/sendError"
import { ErrorName } from "../../errors/errors"
import { validateNewUserMiddleware } from "./validators/validateNewUser"

const factory = new Factory()

export const loginController = factory.createHandlers(async (c) => {
	//const body = await c.req.json()
	return sendErrorResponse(c, ErrorName.EMAIL_ALREADY_EXISTS)
})

export const signupController = factory.createHandlers(
	validateNewUserMiddleware,
	async (c) => {
		const body = await c.req.json()

		//*validate the data
		//*chek if the email already exists
		//*hash the password
		//*create a new user
		//*generate a token
		//*send the token as a cookie
		//*send the user data
		return c.json(body)
	},
)
