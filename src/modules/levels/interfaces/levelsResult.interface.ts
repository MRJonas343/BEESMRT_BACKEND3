import { db } from "../../../db/connection/poolConnection"

export type LevelsResult = Awaited<ReturnType<typeof db.query.levels.findMany>>
export type PlayerTrophiesResult = Awaited<
	ReturnType<typeof db.query.playerTrophies.findMany>
>
