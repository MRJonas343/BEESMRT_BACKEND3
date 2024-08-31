import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const MemoryGameLevels = mysqlTable("MemoryGame", {
	id: serial("id").primaryKey(),
	imgSrc: varchar("imgSrc", { length: 150 }),
	question: varchar("question", { length: 150 }),
	correctAnswer: varchar("correctAnswer", { length: 25 }),
	incorrectAnswer1: varchar("incorrectAnswer1", { length: 25 }),
	incorrectAnswer2: varchar("incorrectAnswer2", { length: 25 }),
	incorrectAnswer3: varchar("incorrectAnswer3", { length: 25 }),
	englishLevel: varchar("englishLevel", { length: 10 }),
})
