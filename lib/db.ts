import { Pool } from "pg"

export const pool = new Pool({
    user: "rich",
    host: "localhost",
    database: "list_app_db",
    password: "reddpos",   // MUST exist, even if empty string
    port: 5432,
})