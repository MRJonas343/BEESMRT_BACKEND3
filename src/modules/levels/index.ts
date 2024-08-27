import { Hono } from "hono"
import { getAvailableLevelsController } from "./getAvailableLevels.controller"
import { validateUserSessionMiddleware } from "../../middlewares/validateUserSession"
import { validateLevelDataMiddleware } from "./middlewares/validateLevelData"

const app = new Hono()

app.get(
	"/getLevels",
	validateUserSessionMiddleware,
	validateLevelDataMiddleware,
	...getAvailableLevelsController,
)

export default app
