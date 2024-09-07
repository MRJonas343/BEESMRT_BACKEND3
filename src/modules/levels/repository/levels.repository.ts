import { db, availabLevels, gameLogs} from "@db"
import { Result } from "@utils"
import { and, eq } from "drizzle-orm"
import {
	LevelsResult,
	PlayerTrophiesResult,
} from "../interfaces/levelsResult.interface"

/**
 * Retrieves levels for a given game.
 *
 * @param game - The game for which to retrieve levels.
 * @returns A promise that resolves to a Result object containing the levels data if successful, or an error message if unsuccessful.
 */
const getLevels = async (game: string): Promise<Result<LevelsResult>> => {
	try {
		const result = await db.query.availabLevels.findMany({
			where: eq(availabLevels.game, game),
		})
		return { success: true, data: result }
	} catch (error) {
		return { success: false, error: "Error" }
	}
}

/**
 * Retrieves the trophies of a player in a specific game.
 *
 * @param game - The name of the game.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to a Result object containing the player's trophies if successful, or an error message if unsuccessful.
 */
const getCompletedLevels = async (
	game: string,
	userId: number,
): Promise<Result<PlayerTrophiesResult>> => {
	try {
		const result = await db.query.gameLogs.findMany({
			where: and(
				eq(gameLogs.userId, userId),
				eq(gameLogs.game, game),
			),
		})
		console.log(result)
		return { success: true, data: result }
	} catch (error) {
		return { success: false, error: "Error" }
	}
}

export { getLevels, getCompletedLevels }
