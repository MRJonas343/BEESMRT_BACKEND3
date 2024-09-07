import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const availabLevels = mysqlTable("AvailableLevels", {
	id: serial("id").primaryKey(),
	englishLevel: varchar("englishLevel", { length: 10 }).notNull(),
	levelName: varchar("levelName", { length: 50 }).notNull(),
	game: varchar("game", { length: 30 }).notNull(),
	level: varchar("level", { length: 20 }).notNull(),
	trophies: int("trophies").notNull(),
})
