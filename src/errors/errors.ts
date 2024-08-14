import { StatusCode } from "hono/utils/http-status"

export enum ErrorName {
	EMAIL_ALREADY_EXISTS = "ERR_EMAIL_ALREADY_EXISTS",
	INVALID_CREDENTIALS = "ERR_INVALID_CREDENTIALS",
}

export const errorCodeMap: Record<ErrorName, StatusCode> = {
	[ErrorName.EMAIL_ALREADY_EXISTS]: 409, // Conflicto
	[ErrorName.INVALID_CREDENTIALS]: 401, // No autorizad
}
