import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const users = mysqlTable("Users", {
	id: serial("id").primaryKey(),
	nickName: varchar("nickName", { length: 50 }).notNull(),
	email: varchar("email", { length: 50 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	profileImg: varchar("profileImg", { length: 102 }),
	englishLevel: varchar("englishLevel", { length: 2 }).notNull(),
})
