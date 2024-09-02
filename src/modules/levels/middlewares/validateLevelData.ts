import { ErrorName, zodErrorsMap } from "@error"
import { sendErrorResponse } from "@utils"
import { createFactory } from "hono/factory"
import { levelDataSchema } from "../interfaces/levelSchema.interface"

const factory = createFactory()

const validateLevelDataMiddleware = factory.createMiddleware(
	async (c, next) => {
		const { game } = c.req.query()

		const levelData = levelDataSchema.safeParse({ game })

		if (!levelData.success) {
			const firstError = levelData.error.errors.find(
				(err) =>
					typeof err.path[0] === "string" &&
					zodErrorsMap.has(err.path[0] as string),
			)

			if (firstError && typeof firstError.path[0] === "string") {
				const errorResponse = zodErrorsMap.get(
					firstError.path[0] as string,
				) as ErrorName
				return sendErrorResponse(c, errorResponse)
			}
		}

		return next()
	},
)

export { validateLevelDataMiddleware }
