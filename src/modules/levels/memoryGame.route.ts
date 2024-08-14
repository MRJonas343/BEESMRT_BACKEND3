import { Hono } from "hono";
import { sayHello } from "../middleware/sayhello";
const memoryGameRouter = new Hono();
import handleCustomError from "../utils/handleErros";

memoryGameRouter.get("/", sayHello, (c) => {
	return handleCustomError(
		c,
		"ERR_YOU_CANT_SAY_HELLO",
		"You can't say hello",
		403,
	);
});

export default memoryGameRouter;
