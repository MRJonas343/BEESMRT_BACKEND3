import { mysqlTable, serial, varchar, int } from "drizzle-orm/mysql-core"

export const PlayerTrophies = mysqlTable("PlayersTrophies", {
	id: serial("id").primaryKey(),
	level: varchar("level", { length: 9 }),
	game: varchar("game", { length: 25 }),
	trophies: int("trophies"),
	userId: int("userId").notNull(),
})
