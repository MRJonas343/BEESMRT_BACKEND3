import { mysqlTable, serial, varchar, int } from "drizzle-orm/mysql-core"

export const playerTrophies = mysqlTable("players_trophies", {
	id: serial("id").primaryKey(),
	level: varchar("Level", { length: 9 }),
	game: varchar("Game", { length: 25 }),
	trophys: int("Trophys"),
	userId: int("userId").notNull(),
})
