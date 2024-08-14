import type { Context } from "hono"
import { errorCodeMap, ErrorName } from "../errors/errors"

export const sendErrorResponse = (c: Context, errorName: ErrorName) => {
	const errorCode = errorCodeMap[errorName] || 500
	return c.json({ error: errorName }, errorCode)
}
