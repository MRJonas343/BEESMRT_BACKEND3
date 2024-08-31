import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const Messages = mysqlTable("Messages", {
	id: serial("id").primaryKey(),
	nameUser: varchar("nameUser", { length: 52 }),
	email: varchar("email", { length: 40 }),
	message: varchar("message", { length: 502 }),
})
