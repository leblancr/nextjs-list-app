import { pool } from "@/lib/db"

export async function GET() {
    const result = await pool.query(
        "SELECT * FROM item_lists ORDER BY id ASC"
    )

    return Response.json(result.rows)
}

export async function POST(req: Request) {
    const { name } = await req.json()

    const result = await pool.query(
        "INSERT INTO lists (name) VALUES ($1) RETURNING *",
        [name]
    )

    return Response.json(result.rows[0])
}
