import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const HangmanGameLevels = mysqlTable("HangmanGame", {
	id: serial("id").primaryKey(),
	word: varchar("word", { length: 18 }).notNull(),
	hint: varchar("hint", { length: 100 }).notNull(),
	englishLevel: varchar("englishLevel", { length: 10 }).notNull(),
})
