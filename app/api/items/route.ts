import { pool } from "@/lib/db"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const list_id = Number(searchParams.get("list_id"))

    const result = await pool.query(
        "SELECT * FROM items WHERE list_id = $1 ORDER BY id ASC",
        [list_id]
    )

    return Response.json(result.rows)
}

export async function POST(req: Request) {
    const { text, list_id } = await req.json()

    const result = await pool.query(
        "INSERT INTO items (text, list_id) VALUES ($1, $2) RETURNING *",
        [text, list_id]
    )

    return Response.json(result.rows[0])
}