import {
	PlayerTrophiesResult,
	LevelsResult,
} from "../interfaces/levelsResult.interface"

const mergeLevels = (levels: LevelsResult, trophies: PlayerTrophiesResult) => {
	const data = levels.map((level) => {
		const { englishLevel, levelName, levels: Level } = level
		const userTrophy = trophies.find((trophy) => trophy.level === Level)
		const Trophys = userTrophy ? userTrophy.trophys : 0
		return { englishLevel, levelName, Level, Trophys }
	})

	return data
}

export { mergeLevels }
