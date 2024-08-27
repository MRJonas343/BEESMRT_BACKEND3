import { z } from "zod"
import { Games } from "./games.interface"

export const levelDataSchema = z.object({
	game: z.enum(
		Object.values(Games) as [(typeof Games)[keyof typeof Games], ...string[]],
	),
	email: z.string().email().min(5),
})

export type levelData = z.infer<typeof levelDataSchema>
