import { and, eq } from "drizzle-orm"
import { db } from "../../../db/connection/poolConnection"
import { levels, playerTrophies } from "../../../db/schemas"

const getLevels = async (game: string) => {
	const result = await db.query.levels.findMany({
		where: eq(levels.game, game),
	})
	return result
}

const getTrophies = async (game: string, email: string) => {
	const result = await db.query.playerTrophies.findMany({
		where: and(
			eq(playerTrophies.emailUser, email),
			eq(playerTrophies.game, game),
		),
	})
	return result
}

export { getLevels, getTrophies }
