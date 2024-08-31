import { Result } from "./ResultType"

/**
 * Checks if the given result is a success.
 *
 * @param result - The result to check, from a query to the Respository.
 * @returns A boolean value indicating if the result is a success.
 */
export function isSuccess<T>(
	result: Result<T>,
): result is { success: true; data: T } {
	return result.success
}
