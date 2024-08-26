import { eq } from "drizzle-orm"
import { db } from "../../../db/connection/poolConnection"
import { User } from "../interfaces/user.interface"
import { users } from "../../../db/schemas"
import { MySqlRawQueryResult } from "drizzle-orm/mysql2"
import { Result } from "../../../errors/resultT"

const findUser = async (email: string): Promise<Result<User | undefined>> => {
	try {
		const user = await db.query.users.findFirst({
			where: eq(users.email, email),
		})

		return { success: true, data: user }
	} catch (error) {
		return { success: false, error: "Error finding user" }
	}
}

const createUser = async (
	email: string,
	password: string,
	nickName: string,
	englishLevel: string,
): Promise<Result<MySqlRawQueryResult>> => {
	try {
		const result = await db
			.insert(users)
			.values({ email, password, nickName, englishLevel })

		return { success: true, data: result }
	} catch (error) {
		return { success: false, error: "Error creating user" }
	}
}

export { findUser, createUser }
