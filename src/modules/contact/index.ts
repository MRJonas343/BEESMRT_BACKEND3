import { Hono } from "hono"
import { contactController } from "./contact.controller"

const app = new Hono()

app.get("/contactUs", ...contactController)

export default app
