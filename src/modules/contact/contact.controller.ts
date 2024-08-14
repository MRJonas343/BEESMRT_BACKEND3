import { Factory } from "hono/factory"
import { db } from "../../db/connection/poolConnection"

const factory = new Factory()

export const contactController = factory.createHandlers(async (c) => {
	const results = await db.query.messagesForm.findMany()
	return c.json(results)
})
