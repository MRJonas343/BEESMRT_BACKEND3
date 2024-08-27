import { Hono } from "hono"
import { getAvailableLevelsController } from "./getAvailableLevels.controller"

const app = new Hono()

app.get("/getLevels", ...getAvailableLevelsController)

export default app
