import { Factory } from "hono/factory"
import { getLevels, getTrophies } from "./repository/levels.repository"
import { sendErrorResponse } from "../../utils"
import { ErrorName } from "../../errors/errors"
const factory = new Factory()

const getAvailableLevelsController = factory.createHandlers(async (c) => {
	const { game, email } = c.req.query()

	const [levels, trophies] = await Promise.all([
		getLevels(game),
		getTrophies(game, email),
	])

	if (!levels.success || !levels.data) {
		return sendErrorResponse(c, ErrorName.SERVER_ERROR)
	}

	const mergeData = () => {
		if (!trophies.success || !trophies.data) {
			const data = levels.data?.map((level) => {
				const { englishLevel, levelName, levels: Level } = level
				return { englishLevel, levelName, Level, Trophys: 0 }
			})
		}
		const data = levels.data?.map((level) => {
			const { englishLevel, levelName, levels: Level } = level
			const trophy =
				trophies.success && trophies.data
					? trophies.data.find((trophy) => trophy.level === Level)
					: null
			return {
				englishLevel,
				levelName,
				Level,
				Trophys: trophy ? trophy.trophys : 0,
			}
		})
		return data
	}
	const data = mergeData()
	return c.json(data)
})

export { getAvailableLevelsController }
