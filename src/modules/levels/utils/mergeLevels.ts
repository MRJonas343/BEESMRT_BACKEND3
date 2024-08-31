import {
	PlayerTrophiesResult,
	LevelsResult,
} from "../interfaces/levelsResult.interface"

/**
 * Merges the levels array with the trophies array to create a new array of merged data.
 *
 * @param levelsArray - The array of levels to be merged.
 * @param trophiesArray - The array of player trophies to be merged.
 * @returns The merged array containing the englishLevel, levelName, level, and trophies for each level.
 */
const mergeLevels = (
	levelsArray: LevelsResult,
	trophiesArray: PlayerTrophiesResult,
) => {
	const data = levelsArray.map((result) => {
		const { englishLevel, levelName, level } = result
		const userTrophy = trophiesArray.find((trophy) => trophy.level === level)
		const trophies = userTrophy ? userTrophy.trophies : 0
		return { englishLevel, levelName, level, trophies }
	})

	return data
}

export { mergeLevels }
