import { Node } from "./node.js";
function getCellPos(xpos, ypos, width, rows) {
  let x = xpos;
  let y = ypos;
  const gap = ~~(width / rows);
  let row = ~~(y / gap);
  let col = ~~(x / gap);

  alert(`${row} ${col}`);
}
function makeGrid(rows, w) {
  const gap = ~~(w / rows);
  let grid = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows / 2; j++) {
      let node = new Node(i, j, gap, rows);
      grid.push([node]);
    }
  }
  return grid;
}
function drawGridLines(ctx, rows, bw) {
  const gap = ~~(bw / rows);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(0,0,0)";
  for (let i = 1; i < rows / 2; i++) {
    ctx.moveTo(0, i * gap);
    ctx.lineTo(bw, i * gap);
  }
  for (let j = 1; j < rows; j++) {
    ctx.moveTo(j * gap, 0);
    ctx.lineTo(j * gap, bw);
  }
  ctx.stroke();
}
function drawGrid(ctx, rows, width) {
  let grid = makeGrid(rows, width);
  grid.forEach((row) => {
    row.forEach((elem) => {
      elem.draw(ctx);
    });
  });
  drawGridLines(ctx, rows, width);
}
window.addEventListener("load", () => {
  const grid = document.querySelector("#grid");
  const ctx = grid.getContext("2d");
  const width = 1000;
  const rows = 40;
  grid.width = width;
  grid.height = width / 2;
  drawGrid(ctx, rows, width);
  grid.addEventListener("click", (e) => {
    getCellPos(e.offsetX, e.offsetY, width, rows);
  });
});
