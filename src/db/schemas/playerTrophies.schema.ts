import { mysqlTable, serial, varchar, int } from "drizzle-orm/mysql-core"
import { Users } from "."

export const PlayerTrophies = mysqlTable("PlayersTrophies", {
	id: serial("id").primaryKey(),
	level: varchar("level", { length: 9 }).notNull(),
	game: varchar("game", { length: 25 }).notNull(),
	trophies: int("trophies").notNull(),
	userId: int("userId")
		.notNull()
		.references(() => Users.id),
})
