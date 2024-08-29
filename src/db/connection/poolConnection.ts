import mysql from "mysql2/promise"
import { drizzle } from "drizzle-orm/mysql2"
import { tablesSchemas } from "./tables"

const poolConnection = mysql.createPool({
	host:
		Bun.env.ENV === "production"
			? Bun.env.DBHOSTPRODUCTION
			: Bun.env.DBHOSTDEVELOPMENT,
	user: Bun.env.DBUSER,
	password: Bun.env.DBPASS,
	database: Bun.env.DBNAME,
	port: Number(Bun.env.DBPORT),
})

export const db = drizzle(poolConnection, {
	schema: tablesSchemas,
	mode: "default",
})
