import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const hangmanGameLevels = mysqlTable("HangmanGameLevels", {
	id: serial("id").primaryKey(),
	word: varchar("word", { length: 18 }),
	hint: varchar("hint", { length: 100 }),
	englishLevel: varchar("EnglishLevel", { length: 10 }),
})
