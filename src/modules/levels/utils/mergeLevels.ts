import {
	PlayerTrophiesResult,
	LevelsResult,
} from "../interfaces/levelsResult.interface"

/**
 * Merges the levels array with the completedLevels array to create a new array of merged data.
 *
 * @param levelsArray - The array of levels to be merged.
 * @param completedLevels - The array of player trophies for completed levels to be merged.
 * @returns The merged array containing the id, englishLevel, levelName, level, trophies, and isCompleted for each level.
 */
const mergeLevels = (
	levelsArray: LevelsResult,
	completedLevels: PlayerTrophiesResult,
) => {
	const data = levelsArray.map((result) => {
		const { id, englishLevel, levelName, level, trophies } = result
		const completedLevel = completedLevels.find(
			(gameLog) => gameLog.level === level,
		)
		const isCompleted = Boolean(completedLevel?.isCompleted)
		return { id, englishLevel, levelName, level, trophies, isCompleted }
	})
	return data
}

export { mergeLevels }
