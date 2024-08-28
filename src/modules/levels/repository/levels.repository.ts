import { and, eq } from "drizzle-orm"
import { db } from "../../../db/connection/poolConnection"
import { levels, playerTrophies } from "../../../db/schemas"
import { Result } from "../../../utils"
import {
	LevelsResult,
	PlayerTrophiesResult,
} from "../interfaces/levelsResult.interface"

const getLevels = async (game: string): Promise<Result<LevelsResult>> => {
	try {
		const result = await db.query.levels.findMany({
			where: eq(levels.game, game),
		})
		return { success: true, data: result }
	} catch (error) {
		return { success: false, error: "Error" }
	}
}

const getTrophies = async (
	game: string,
	email: string,
): Promise<Result<PlayerTrophiesResult>> => {
	try {
		const result = await db.query.playerTrophies.findMany({
			where: and(
				eq(playerTrophies.emailUser, email),
				eq(playerTrophies.game, game),
			),
		})
		return { success: true, data: result }
	} catch (error) {
		return { success: false, error: "Error" }
	}
}

export { getLevels, getTrophies }
