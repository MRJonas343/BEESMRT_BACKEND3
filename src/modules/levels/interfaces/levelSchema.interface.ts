import { z } from "zod"

export const levelDataSchema = z.object({
	game: z.enum([
		"MemoryGame",
		"HangmanGame",
		"DragAndDropGame",
		"SentenceScrambleGame",
	]),
})
