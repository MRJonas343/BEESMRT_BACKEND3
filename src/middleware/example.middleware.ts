import { Factory } from "hono/factory"

const factory = new Factory()

const exampleMiddleware = factory.createMiddleware(async (c, next) => {
	console.log("This is an example middleware")
	return next()
})

export default exampleMiddleware
