import { isSuccess, sendErrorResponse } from "@utils"
import { ErrorName } from "@error"
import { getCompletedLevels, getLevels } from "./repository/levels.repository"
import { mergeLevels } from "./utils/mergeLevels"
import { Factory } from "hono/factory"

const factory = new Factory()

const getAvailableLevelsController = factory.createHandlers(async (c) => {
	const { game } = c.req.query()

	const userId = c.get("userId")

	const [levels, completedLevels] = await Promise.all([
		getLevels(game),
		getCompletedLevels(game, userId),
	])

	if (!isSuccess(levels) || !levels.data) {
		return sendErrorResponse(c, ErrorName.SERVER_ERROR)
	}

	if (!isSuccess(completedLevels) || !completedLevels.data) {
		return sendErrorResponse(c, ErrorName.SERVER_ERROR)
	}

	const data = mergeLevels(levels.data, completedLevels.data)

	return c.json(data)
})

export { getAvailableLevelsController }
