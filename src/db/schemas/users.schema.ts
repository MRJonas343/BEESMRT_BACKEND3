import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const Users = mysqlTable("Users", {
	id: serial("id").primaryKey(),
	nickName: varchar("nickName", { length: 50 }),
	email: varchar("email", { length: 50 }),
	password: varchar("password", { length: 255 }),
	profileImg: varchar("profileImg", { length: 102 }),
	englishLevel: varchar("englishLevel", { length: 2 }),
})
