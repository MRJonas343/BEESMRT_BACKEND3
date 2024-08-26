import { Hono } from "hono"
import {
	loginController,
	signupController,
	logOutController,
} from "./auth.controller"

const app = new Hono()

app.post("/login", ...loginController)

app.post("/signup", ...signupController)

app.post("/logout", ...logOutController)

export default app
