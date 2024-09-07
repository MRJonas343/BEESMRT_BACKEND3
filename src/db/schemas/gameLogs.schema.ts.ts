import { mysqlTable, serial, varchar, int, boolean } from "drizzle-orm/mysql-core"
import { users } from "."

export const gameLogs = mysqlTable("GameLogs", {
	id: serial("id").primaryKey(),
	level: varchar("level", { length: 9 }).notNull(),
	game: varchar("game", { length: 25 }).notNull(),	
	userId: int("userId")
		.notNull()
		.references(() => users.id),
	isCompleted: boolean("isCompleted").notNull(),
})
