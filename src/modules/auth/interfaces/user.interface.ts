import { z } from "zod"
import { db } from "../../../db/connection/poolConnection"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/

export const newUserSchema = z.object({
	email: z.string().email().min(5).max(50),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long" })
		.max(20, { message: "Password must be at most 20 characters long" })
		.regex(passwordRegex, {
			message:
				"Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
		}),
	nickName: z.string().min(5).max(50),
	englishLevel: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
})

export const existingUserSchema = z.object({
	email: z.string().email().min(5),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long" })
		.max(20, { message: "Password must be at most 20 characters long" })
		.regex(passwordRegex, {
			message:
				"Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
		}),
})

export type newUser = z.infer<typeof newUserSchema>

export type existingUser = z.infer<typeof existingUserSchema>

export type UserResult = Awaited<ReturnType<typeof db.query.Users.findFirst>>
