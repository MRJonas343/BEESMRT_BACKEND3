import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const levels = mysqlTable("Levels", {
	id: serial("id").primaryKey(),
	englishLevel: varchar("EnglishLevel", { length: 10 }).notNull(),
	levelName: varchar("LevelName", { length: 50 }).notNull(),
	game: varchar("Game", { length: 30 }).notNull(),
	levels: varchar("levels", { length: 20 }).notNull(),
})
