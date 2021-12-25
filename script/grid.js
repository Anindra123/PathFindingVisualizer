import { Node } from "./node.js";
function getCellPos(xpos, ypos, width, rows) {
  let x = xpos;
  let y = ypos;
  const gap = ~~(width / rows);
  let row = ~~(y / gap);
  let col = ~~(x / gap);

  return [row, col];
}
function getCellList(rows, w) {
  const gap = ~~(w / rows);
  let cellList = [];
  for (let i = 0; i < rows / 2; i++) {
    let row = [];
    for (let j = 0; j < rows; j++) {
      let node = new Node(i, j, gap, rows);
      row.push(node);
    }
    cellList.push(row);
  }
  return cellList;
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
function drawGrid(ctx, cellList, rows, width) {
  cellList.forEach((row) => {
    row.forEach((elem) => {
      elem.setNotVisited(ctx);
    });
  });
}
function drawWallNode(ctx, cellList, row, col) {
  if (
    cellList[row][col] !== undefined &&
    cellList[row][col].getisNotVisited()
  ) {
    cellList[row][col].setWall(ctx);
  } else {
    return;
  }
}
function drawNotVisitedNode(ctx, cellList, row, col) {
  if (cellList[row][col] !== undefined && cellList[row][col].getisWall()) {
    cellList[row][col].setNotVisited(ctx);
  } else {
    return;
  }
}
function pickRandStartAndEnd(ctx, grid) {
  let notvisitedList = [];
  grid.forEach((row) => {
    row.forEach((cell) => {
      if (cell.getisNotVisited()) {
        notvisitedList.push(cell);
      }
    });
  });
  let startNode =
    notvisitedList[Math.floor(Math.random() * notvisitedList.length)];
  let endNode =
    notvisitedList[Math.floor(Math.random() * notvisitedList.length)];
  startNode.setStart(ctx);
  endNode.setEnd(ctx);
  return [startNode, endNode];
}

export {
  getCellList,
  getCellPos,
  drawGrid,
  drawGridLines,
  drawNotVisitedNode,
  drawWallNode,
  pickRandStartAndEnd,
};
