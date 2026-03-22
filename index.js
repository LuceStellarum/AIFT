const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT name FROM test LIMIT 1");

    let name = "";
    if (result.rows.length > 0) {
      name = result.rows[0].name;
    }

    res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Chess</title>
<style>
body {
  font-family: sans-serif;
  text-align: center;
}

#board {
  width: 480px;
  height: 480px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border: 2px solid black;
}

.square {
  width: 60px;
  height: 60px;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.light { background: #f0d9b5; }
.dark { background: #b58863; }

.piece {
  cursor: grab;
}
</style>
</head>
<body>

<h1>HELLO ${name}</h1>

<div id="board"></div>

<script>
const board = document.getElementById("board");

const pieces = {
  r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
  R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙"
};

const startPosition = [
  "rnbqkbnr",
  "pppppppp",
  "........",
  "........",
  "........",
  "........",
  "PPPPPPPP",
  "RNBQKBNR"
];

let draggedPiece = null;

function createBoard() {
  board.innerHTML = "";

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const square = document.createElement("div");
      square.className = "square " + ((x + y) % 2 === 0 ? "light" : "dark");
      square.dataset.x = x;
      square.dataset.y = y;

      square.addEventListener("dragover", e => e.preventDefault());
      square.addEventListener("drop", dropPiece);

      const pieceChar = startPosition[y][x];
      if (pieceChar !== ".") {
        const piece = document.createElement("div");
        piece.textContent = pieces[pieceChar];
        piece.className = "piece";
        piece.draggable = true;

        piece.addEventListener("dragstart", dragStart);

        square.appendChild(piece);
      }

      board.appendChild(square);
    }
  }
}

function dragStart(e) {
  draggedPiece = e.target;
}

function dropPiece(e) {
  if (!draggedPiece) return;

  const square = e.currentTarget;
  square.innerHTML = "";
  square.appendChild(draggedPiece);
}

createBoard();
</script>

</body>
</html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
