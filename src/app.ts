import { Hono } from "hono"
import auth from "./modules/auth"
import levels from "./modules/levels"

const app = new Hono()

app.get("/", (c) => {
	return c.json({ message: "Hello TTTT" })
})

app.notFound((c) => {
	return c.json({ message: "Not Found Beezzz" }, 404)
})

//*Auth Module
app.route("/auth", auth)

//*Levels Module
app.route("/levels", levels)

export default app
