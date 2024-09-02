import { isSuccess, sendErrorResponse } from "@utils"
import { ErrorName } from "@error"
import { getLevels, getTrophies } from "./repository/levels.repository"
import { mergeLevels } from "./utils/mergeLevels"
import { Factory } from "hono/factory"

const factory = new Factory()

const getAvailableLevelsController = factory.createHandlers(async (c) => {
	const { game } = c.req.query()

	const userId = c.get("userId")

	const [levels, trophies] = await Promise.all([
		getLevels(game),
		getTrophies(game, userId),
	])

	if (!isSuccess(levels) || !levels.data) {
		return sendErrorResponse(c, ErrorName.SERVER_ERROR)
	}

	if (!isSuccess(trophies) || !trophies.data) {
		return sendErrorResponse(c, ErrorName.SERVER_ERROR)
	}

	const data = mergeLevels(levels.data, trophies.data)

	return c.json(data)
})

export { getAvailableLevelsController }
