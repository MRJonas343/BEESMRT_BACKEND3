export interface LevelsResult {
	id: number
	englishLevel: EnglishLevel
	levelName: string
	game: Game
	levels: string
}

export enum EnglishLevel {
	A1 = "A1",
	A2 = "A2",
	B1 = "B1",
	B2 = "B2",
	C1 = "C1",
	C2 = "C2",
}

export enum Game {
	MemoryGame = "MemoryGame",
	HangmanGame = "HangmanGame",
	DragAndDropGame = "DragAndDropGame",
	SentenceScrambleGame = "SentenceScrambleGame",
}
