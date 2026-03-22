const game = new Chess();

const board = Chessboard('board', {
draggable: true,
position: 'start',
onDrop: function (source, target) {
const move = game.move({
from: source,
to: target,
promotion: 'q'
});

```
if (move === null) return 'snapback';
```

}
});
