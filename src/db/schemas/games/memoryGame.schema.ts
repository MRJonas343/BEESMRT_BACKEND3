import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const MemoryGameLevels = mysqlTable("MemoryGame", {
	id: serial("id").primaryKey(),
	imgSrc: varchar("imgSrc", { length: 150 }).notNull(),
	question: varchar("question", { length: 150 }).notNull(),
	correctAnswer: varchar("correctAnswer", { length: 25 }).notNull(),
	incorrectAnswer1: varchar("incorrectAnswer1", { length: 25 }).notNull(),
	incorrectAnswer2: varchar("incorrectAnswer2", { length: 25 }).notNull(),
	incorrectAnswer3: varchar("incorrectAnswer3", { length: 25 }).notNull(),
	englishLevel: varchar("englishLevel", { length: 10 }).notNull(),
})
