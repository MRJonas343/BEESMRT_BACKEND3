import { mysqlTable, serial, varchar, int } from "drizzle-orm/mysql-core"

export const playerTrophies = mysqlTable("players_trophies", {
	id: serial("id").primaryKey(),
	level: varchar("Level", { length: 9 }),
	game: varchar("Game", { length: 15 }),
	trophys: int("Trophys"),
	emailUser: varchar("emailUser", { length: 50 }),
})
