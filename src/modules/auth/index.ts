import { Hono } from "hono"
import {
	loginController,
	signupController,
	logOutController,
} from "./auth.controller"
import {
	validateUserMiddleware,
	validateNewUserMiddleware,
} from "./middlewares"

const app = new Hono()

app.post("/login", validateUserMiddleware, ...loginController)

app.post("/signup", validateNewUserMiddleware, ...signupController)

app.post("/logout", ...logOutController)

export default app
