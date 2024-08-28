import { Result } from "./ResultType"

export function isSuccess<T>(
	result: Result<T>,
): result is { success: true; data: T } {
	return result.success
}
