// pages/api/login.js

import { Pool } from "pg";

// Create your PostgreSQL pool.
// Make sure you have your DATABASE_URL set in your environment variables.

const pool = new Pool({
    user: 'postgres',
    host: '34.93.195.0',
    database: 'postgres',
    password: 'Plotpointe!@3456',
    port: 5432,
  });
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    try {
      const result = await pool.query(
        "SELECT id FROM login WHERE username = $1 AND password = $2",
        [username, password]
      );

      if (result.rows.length > 0) {
        return res.status(200).json({ userId: result.rows[0].id });
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error querying database:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }
}
