import { init } from "@sentry/bun"
import { Hono } from "hono"
import { cors } from "hono/cors"
import app from "./app"

const server = new Hono()

init({
	dsn: Bun.env.SENTRY_DSN,
	tracesSampleRate: 1.0,
})

server.use(
	cors({
		origin: ["http://localhost:5173", "http://localhost:4173"],
		allowMethods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
)
server.route("/", app)

export default {
	port: Bun.env.PORT ?? 3000,
	fetch: server.fetch,
}
