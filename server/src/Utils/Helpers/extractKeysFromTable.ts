import { PgTableWithColumns } from "drizzle-orm/pg-core"

// TODO: remove any Type
export const extractKeysFromTable = (table: PgTableWithColumns<any>) => {
    return Object.keys(table)
		.filter((column) => column !== 'id' && column !== 'user_id')
		.map((column) => column.toUpperCase())
}