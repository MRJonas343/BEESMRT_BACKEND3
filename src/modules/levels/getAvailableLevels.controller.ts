import { Factory } from "hono/factory"
import { getLevels, getTrophies } from "./repository/levels.repository"

const factory = new Factory()

const getAvailableLevelsController = factory.createHandlers(async (c) => {
	const { game, email } = c.req.query()

	const [levels, trophies] = await Promise.all([
		getLevels(game),
		getTrophies(game, email),
	])

	const data = levels.map((level) => {
		const { englishLevel, levelName, levels: Level } = level
		const userTrophy = trophies.find((trophy) => trophy.level === Level)
		const Trophys = userTrophy ? userTrophy.trophys : 0
		return { englishLevel, levelName, Level, Trophys }
	})

	return c.json(data)
})

export { getAvailableLevelsController }
