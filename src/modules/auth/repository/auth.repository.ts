import { eq } from "drizzle-orm"
import { db } from "../../../db/connection/poolConnection"
import { Users } from "../../../db/schemas"
import { MySqlRawQueryResult } from "drizzle-orm/mysql2"
import { Result } from "../../../utils"
import { UserResult } from "../interfaces/user.interface"

/**
 * Finds a user by their email address.
 *
 * @param email - The email address of the user to find.
 * @returns A promise that resolves to a Result object containing the user data if found, or an error message if not found.
 */
const findUser = async (email: string): Promise<Result<UserResult>> => {
	try {
		const user = await db.query.Users.findFirst({
			where: eq(Users.email, email),
		})

		return { success: true, data: user }
	} catch (error) {
		return { success: false, error: "Error finding user" }
	}
}

/**
 * Creates a new user with the provided information.
 *
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @param nickName - The nickname of the user.
 * @param englishLevel - The English level of the user.
 * @returns A promise that resolves to a Result object containing the success status and the created user data, or an error message if the user creation fails.
 */
const createUser = async (
	email: string,
	password: string,
	nickName: string,
	englishLevel: string,
): Promise<Result<MySqlRawQueryResult>> => {
	try {
		const result = await db
			.insert(Users)
			.values({ email, password, nickName, englishLevel })

		return { success: true, data: result }
	} catch (error) {
		return { success: false, error: "Error creating user" }
	}
}

export { findUser, createUser }
