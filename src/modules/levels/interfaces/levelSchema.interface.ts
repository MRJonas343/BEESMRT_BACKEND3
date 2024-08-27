import { z } from "zod"
import { Levels } from "./levels.interface"
import { Games } from "./games.interface"

export const levelDataSchema = z.object({
	game: z.enum(
		Object.values(Games) as [(typeof Games)[keyof typeof Games], ...string[]],
	),
	level: z.enum(
		Object.values(Levels) as [
			(typeof Levels)[keyof typeof Levels],
			...string[],
		],
	),
})

export type levelData = z.infer<typeof levelDataSchema>
