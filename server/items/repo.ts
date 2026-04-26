import { pool } from "@/lib/db"

export async function getItemsByList(listId: number) {
    const result = await pool.query(
        `SELECT id, text AS title, list_id AS "listId"
         FROM items
         WHERE list_id = $1
         ORDER BY id ASC`,
        [listId]
    )

    return result.rows
}