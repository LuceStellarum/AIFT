let targetOpening = [];
let attempts = 0;
let solvedAt = null;

fetch("/random-opening")
.then(r=>r.json())
.then(data=>{
  targetOpening = data;
});

const game = new Chess();

let guessMoves = [];

const moveList = document.getElementById("moveList");
const results = document.getElementById("results");

const board = Chessboard("board",{

draggable:true,
position:"start",

onDrop:(source,target)=>{

const move = game.move({
from:source,
to:target,
promotion:"q"
});

if(!move) return "snapback";

if(guessMoves.length >= 12){
  game.undo();
  return "snapback";
}

guessMoves.push(move.san);

updateMoveList();

}

});

function updateMoveList(){
moveList.textContent = guessMoves.join(" ");
}

// 되돌리기 버튼

document.getElementById("undoBtn").onclick = ()=>{

if(guessMoves.length===0) return;

game.undo();
board.position(game.fen());

guessMoves.pop();
updateMoveList();

};

// 초기화 버튼

}
