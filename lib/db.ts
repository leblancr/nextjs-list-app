import { Pool } from "pg"

export const pool = new Pool({
    connectionString: "postgresql://rich@localhost:5432/list_app_db"
})