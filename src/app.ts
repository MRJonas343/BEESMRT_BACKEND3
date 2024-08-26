import { Hono } from "hono"
import auth from "./modules/auth"
import contact from "./modules/contact"
const app = new Hono()

app.get("/", (c) => {
	return c.json({ message: "Hello TTTT" })
})

app.notFound((c) => {
	return c.json({ message: "Not Found Beezzz" }, 404)
})

//*Auth Module
app.route("/auth", auth)

//*Contact Module
app.route("/contact", contact)

export default app
