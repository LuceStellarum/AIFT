const express = require("express");
const { Pool } = require("pg");

const app = express();

// Render 환경변수 DATABASE_URL 사용
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT name FROM test LIMIT 1");
    
    if (result.rows.length === 0) {
      return res.send("HELLO");
    }

    const name = result.rows[0].name;
    res.send(`HELLO ${name}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});