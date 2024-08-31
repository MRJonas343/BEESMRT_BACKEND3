/**
 * Hashes a password using the Argon2id algorithm.
 *
 * @param password - The password to be hashed.
 * @returns The hashed password.
 */
const hashPassword = async (password: string) => {
	const hashedPassword = await Bun.password.hash(password, {
		algorithm: "argon2id",
		memoryCost: 16,
		timeCost: 3,
	})

	return hashedPassword
}

/**
 * Compares a password with a hashed password.
 *
 * @param password - The password to compare.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A promise that resolves to a boolean indicating whether the password is correct.
 */
const comparePassword = async (password: string, hashedPassword: string) => {
	const isPasswordCorrect = await Bun.password.verify(password, hashedPassword)

	return isPasswordCorrect
}

export { hashPassword, comparePassword }
