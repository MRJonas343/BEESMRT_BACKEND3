import { Factory } from "hono/factory"
import { validateLevelDataMiddleware } from "./middlewares/validateLevelData"
import { validateUserSessionMiddleware } from "./middlewares/validateUserSession"

const factory = new Factory()

export const getAvailableLevelsController = factory.createHandlers(
	validateLevelDataMiddleware,
	validateUserSessionMiddleware,
	async (c) => {
		//*chek is the data is valid ✅
		//*chek if the user is authenticated
		//*if not just make the query of the levels
		//*if yes make the query of the levels and the trophies
		//*then join the data and return it

		return c.json("ssss")
	},
)
