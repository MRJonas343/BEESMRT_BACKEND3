import { Hono } from "hono"
import { cors } from "hono/cors"
import app from "./app"

const server = new Hono()

server.use(
	cors({
		origin: "http://localhost:5173",
		allowMethods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
)

server.route("/", app)

export default {
	port: Bun.env.PORT,
	fetch: server.fetch,
}
