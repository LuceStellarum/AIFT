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

const board = Chessboard("board",{

draggable:true,
position:"start",

pieceTheme:
"https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/img/chesspieces/wikipedia/{piece}.png"

onDrop:(source,target)=>{

const move = game.move({
from:source,
to:target,
promotion:"q"
});

if(!move) return "snapback";

guessMoves.push(move.san);

updateMoveList();

}

});

function updateMoveList(){

moveList.textContent = guessMoves.join(" ");

}

document.getElementById("submitGuess").onclick = ()=>{

if(guessMoves.length !== 12){

alert("12수를 모두 입력해야 합니다");
return;

}

evaluateGuess();

game.reset();
board.start();
guessMoves = [];
updateMoveList();

};

function evaluateGuess(){

const row=document.createElement("div");
row.className="row";

let correctCount=0;

for(let i=0;i<12;i++){

const cell=document.createElement("span");
cell.className="cell";
cell.textContent=guessMoves[i];

if(guessMoves[i]===targetOpening[i]){

cell.classList.add("green");
correctCount++;

}else if(targetOpening.includes(guessMoves[i])){

cell.classList.add("yellow");

}else{

cell.classList.add("gray");

}

row.appendChild(cell);

}

document.getElementById("results").appendChild(row);

attempts++;

if(correctCount===12 && solvedAt===null){

solvedAt=attempts;
alert("정답! "+solvedAt+"번째 시도");

}

if(attempts>=6){

alert("실패! 정답: "+targetOpening.join(" "));

}

}
