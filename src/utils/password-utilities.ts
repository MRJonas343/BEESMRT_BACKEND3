const hashPassword = async (password: string) => {
	const hashedPassword = await Bun.password.hash(password, {
		algorithm: "argon2id",
		memoryCost: 16,
		timeCost: 3,
	})

	return hashedPassword
}

const comparePassword = async (password: string, hashedPassword: string) => {
	const isPasswordCorrect = await Bun.password.verify(password, hashedPassword)

	return isPasswordCorrect
}

export { hashPassword, comparePassword }
