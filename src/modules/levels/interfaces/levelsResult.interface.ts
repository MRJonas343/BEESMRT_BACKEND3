import { db } from "@db"

export type LevelsResult = Awaited<ReturnType<typeof db.query.availabLevels.findMany>>

export type PlayerTrophiesResult = Awaited<
	ReturnType<typeof db.query.gameLogs.findMany>
>
