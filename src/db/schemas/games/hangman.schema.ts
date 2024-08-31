import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const HangmanGameLevels = mysqlTable("HangmanGame", {
	id: serial("id").primaryKey(),
	word: varchar("word", { length: 18 }),
	hint: varchar("hint", { length: 100 }),
	englishLevel: varchar("englishLevel", { length: 10 }),
})
