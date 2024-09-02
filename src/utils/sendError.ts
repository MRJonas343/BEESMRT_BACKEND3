import { errorCodeMap, ErrorName } from "@error"
import type { Context } from "hono"

/**
 * Sends an error response with the specified error name and status code.
 *
 * @param c - The context object.
 * @param errorName - The name of the error.
 * @returns The JSON response with the error name and status code.
 */
const sendErrorResponse = (c: Context, errorName: ErrorName) => {
	const errorCode = errorCodeMap[errorName] || 500
	return c.json({ error: errorName }, errorCode)
}

export { sendErrorResponse }
