import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const DragAndDropGame = mysqlTable("DragAndDropGame", {
	id: serial("id").primaryKey(),
	word: varchar("word", { length: 50 }).notNull(),
	image: varchar("image", { length: 150 }).notNull(),
	englishLevel: varchar("englishLevel", { length: 10 }).notNull(),
})
