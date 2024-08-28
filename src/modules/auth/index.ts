import { Hono } from "hono"
import {
	loginController,
	signUpController,
	logOutController,
} from "./auth.controller"
import {
	validateUserMiddleware,
	validateNewUserMiddleware,
} from "./middlewares"

const app = new Hono()

app.post("/login", validateUserMiddleware, ...loginController)

app.post("/signup", validateNewUserMiddleware, ...signUpController)

app.post("/logout", ...logOutController)

export default app
