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
import { deleteCookie } from "hono/cookie"
import { isSuccess } from "../../utils"
const factory = new Factory()

const loginController = factory.createHandlers(async (c) => {
	const body = await c.req.json()

	const user = await findUser(body.email)

	if (!isSuccess(user) || !user.data) {
		return sendErrorResponse(c, ErrorName.SERVER_ERROR)
	}

	const { id, nickName, englishLevel } = user.data

	const token = await createToken(String(id))
	await updateCookie(c, token)

	return c.json({ id, nickName, englishLevel })
})

const signUpController = factory.createHandlers(async (c) => {
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
	const id = newUser.data![0].insertId

	const token = await createToken(String(id))

	await setNewCookie(c, token)

	return c.json({ id, nickName, englishLevel })
})

const logOutController = factory.createHandlers(async (c) => {
	deleteCookie(c, "token")

	return c.json({ succes: true })
})

export { loginController, signUpController, logOutController }
