import { Hono } from "hono"
import { loginController, signupController } from "./auth.controller"

const app = new Hono()

app.post("/login", ...loginController)

app.post("/signup", ...signupController)

export default app
