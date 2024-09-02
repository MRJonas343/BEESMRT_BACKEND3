import { db } from "@db"

export type LevelsResult = Awaited<ReturnType<typeof db.query.Levels.findMany>>

export type PlayerTrophiesResult = Awaited<
	ReturnType<typeof db.query.PlayerTrophies.findMany>
>
