import { Factory } from "hono/factory"
import { createUser, findUser } from "./repository/auth.repository"
import {
	hashPassword,
	sendErrorResponse,
	createRefreshToken,
	createAcessToken,
	updateCookie,
	isSuccess,
	setAuthCookies,
	getCookie,
	getIDFromToken,
} from "../../utils"
import { deleteCookie } from "hono/cookie"
import { ErrorName } from "../../errors"

const factory = new Factory()

const loginController = factory.createHandlers(async (c) => {
	const body = await c.req.json()

	const user = await findUser(body.email)

	if (!isSuccess(user) || !user.data) {
		return sendErrorResponse(c, ErrorName.SERVER_ERROR)
	}

	const { id, nickName, englishLevel } = user.data

	const accessToken = await createAcessToken(String(id))
	const refreshToken = await createRefreshToken(String(id))

	await setAuthCookies(c, accessToken, refreshToken)

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

	const accessToken = await createAcessToken(String(id))
	const refreshToken = await createRefreshToken(String(id))

	await setAuthCookies(c, accessToken, refreshToken)

	return c.json({ id, nickName, englishLevel })
})

const refreshTokenController = factory.createHandlers(async (c) => {
	const cookies = await getCookie(c)
	const refreshToken = cookies?.refreshToken

	if (!refreshToken) {
		return sendErrorResponse(c, ErrorName.INVALID_CREDENTIALS)
	}

	const result = await getIDFromToken(refreshToken)

	if (!result.success) {
		deleteCookie(c, "refreshToken")
		return sendErrorResponse(c, ErrorName.INVALID_CREDENTIALS)
	}

	const newAccessToken = await createAcessToken(String(result.data))
	await updateCookie(c, newAccessToken)

	return c.json({ success: true })
})

const logOutController = factory.createHandlers(async (c) => {
	deleteCookie(c, "accessToken")
	deleteCookie(c, "refreshToken")

	return c.json({ succes: true })
})

export {
	loginController,
	signUpController,
	refreshTokenController,
	logOutController,
}
