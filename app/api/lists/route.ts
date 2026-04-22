import { pool } from "@/lib/db"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const listId = searchParams.get("list_id")

    const result = await pool.query(
        "SELECT * FROM items WHERE list_id = $1 ORDER BY id ASC",
        [listId]
    )

    return Response.json(result.rows)
}

export async function POST(req: Request) {
    const body = await req.json()

    const result = await pool.query(
        "INSERT INTO items (text, list_id) VALUES ($1, $2) RETURNING *",
        [body.text, body.list_id]
    )

    return Response.json(result.rows[0])
}