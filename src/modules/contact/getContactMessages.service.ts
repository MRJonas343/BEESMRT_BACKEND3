import { db } from "../../db/connection/poolConnection"
//import { messagesForm } from "../../db/schemas"

export const getContactMessages = async () => {
	//?two ways to query the database

	//*Passing the table name as a parameter
	//const results = await db.select().from(messagesForm)

	//*Using the query method
	const results = await db.query.messagesForm.findMany()
	return results
}
