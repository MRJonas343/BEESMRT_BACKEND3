import { Factory } from "hono/factory"
import { ErrorName } from "../../errors/errors"
import { createUser, findUser } from "./repository/auth.repository"
import {
	hashPassword,
	sendErrorResponse,
	setNewCookie,
	createToken,
	updateCookie,
} from "../../utils"
import { validateNewUserMiddleware, validateUserMiddleware } from "./validators"
import { deleteCookie } from "hono/cookie"

const factory = new Factory()

export const loginController = factory.createHandlers(
	validateUserMiddleware,
	async (c) => {
		const body = await c.req.json()

		const user = await findUser(body.email)
		if (!user.success) {
			return sendErrorResponse(c, ErrorName.SERVER_ERROR)
		}

		const token = await createToken()

		await updateCookie(c, token)

		const { email, nickName, englishLevel } = user.data!

		return c.json({ email, nickName, englishLevel })
	},
)

export const signupController = factory.createHandlers(
	validateNewUserMiddleware,
	async (c) => {
		const { email, password, nickName, englishLevel } = await c.req.json()

		const hashedPassword = await hashPassword(password)

		const newUser = await createUser(
			email,
			hashedPassword,
			nickName,
			englishLevel,
		)

		if (!newUser.success) {
			return sendErrorResponse(c, ErrorName.SERVER_ERROR)
		}

		const token = await createToken()

		await setNewCookie(c, token)

		return c.json({ email, nickName, englishLevel })
	},
)

export const logOutController = factory.createHandlers(async (c) => {
	deleteCookie(c, "token")

	return c.json({ succes: true })
})
