const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());

const pool = new Pool({
connectionString: process.env.DATABASE_URL
});

// 랜덤 오프닝 가져오기
app.get("/random-opening", async (req, res) => {

try {

```
const result = await pool.query(`
  SELECT
    move1,move2,move3,move4,move5,move6,
    move7,move8,move9,move10,move11,move12
  FROM openings
  ORDER BY random()
  LIMIT 1
`);

const row = result.rows[0];

const moves = [
  row.move1,row.move2,row.move3,row.move4,row.move5,row.move6,
  row.move7,row.move8,row.move9,row.move10,row.move11,row.move12
];

res.json(moves);
```

} catch (err) {

```
console.error(err);
res.status(500).send("DB error");
```

}

});

app.listen(3000, () => {
console.log("Server running on port 3000");
});
