import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const normalUserInfo = mysqlTable("users", {
	id: serial("id").primaryKey(),
	fullName: varchar("fullName", { length: 70 }),
	nickName: varchar("nickName", { length: 70 }),
	email: varchar("email", { length: 100 }),
	password: varchar("password", { length: 255 }),
	profileImg: varchar("profileImg", { length: 400 }),
	englishLevel: varchar("englishLevel", { length: 10 }),
})
