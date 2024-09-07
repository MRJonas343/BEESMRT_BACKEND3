import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const messages = mysqlTable("Messages", {
	id: serial("id").primaryKey(),
	nameUser: varchar("nameUser", { length: 52 }).notNull(),
	email: varchar("email", { length: 40 }).notNull(),
	message: varchar("message", { length: 502 }).notNull(),
})
