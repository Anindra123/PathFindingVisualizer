import { runBFSAlgo } from "./Algorithms/bfs.js";
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
window.addEventListener("load", () => {
  const grid = document.querySelector("#grid");
  const ctx = grid.getContext("2d");
  const width = 1000;
  const rows = 40;
  const gridLayer = document.querySelector("#grid-layer");
  const runBfsBtn = document.querySelector(".runBFS");
  const context = gridLayer.getContext("2d");
  gridLayer.width = width;
  gridLayer.height = width / 2;
  grid.width = width;
  grid.height = width / 2;
  const cellList = getCellList(rows, width);
  drawGrid(ctx, cellList, rows, width);
  drawGridLines(context, rows, width);
  let drawWall = false;
  let removeWall = false;
  let drawStart = false;
  let drawEnd = false;
  let startNode = null;
  let endNode = null;
  grid.addEventListener("click", (e) => {
    let [row, col] = getCellPos(e.offsetX, e.offsetY, width, rows);
    let selectedNode = cellList[row][col];
    if (e.button == 0) {
      if (
        selectedNode.getisNotVisited() &&
        !selectedNode.getisWall() &&
        !drawStart
      ) {
        selectedNode.setStart(ctx);
        startNode = selectedNode;
        drawStart = true;
      } else if (
        selectedNode.getisNotVisited() &&
        !selectedNode.getisWall() &&
        !drawEnd
      ) {
        selectedNode.setEnd(ctx);
        endNode = selectedNode;
        drawEnd = true;
      } else if (selectedNode.getisStart()) {
        drawStart = false;
        selectedNode.setNotVisited(ctx);
      } else if (selectedNode.getisEnd()) {
        drawEnd = false;
        selectedNode.setNotVisited(ctx);
      } else if (drawStart && drawEnd) {
        selectedNode.setWall(ctx);
      }
    }
  });
  grid.addEventListener("mousedown", (e) => {
    if (e.button == 0) {
      drawWall = true;
    }
    if (e.button == 1) {
      removeWall = true;
    }
  });
  grid.addEventListener("mousemove", (e) => {
    let [row, col] = getCellPos(e.offsetX, e.offsetY, width, rows);
    try {
      if (drawWall) {
        drawWallNode(ctx, cellList, row, col);
      }
      if (removeWall) {
        drawNotVisitedNode(ctx, cellList, row, col);
      }
    } catch {
      drawWall = false;
      removeWall = false;
    }
  });
  grid.addEventListener("mouseout", () => {
    drawWall = false;
    removeWall = false;
  });
  grid.addEventListener("mouseup", () => {
    drawWall = false;
    removeWall = false;
  });
  runBfsBtn.addEventListener("click", () => {
    grid.style.pointerEvents = "none";
    if (startNode != null && endNode != null) {
      runBFSAlgo(ctx, cellList, startNode, endNode);
    }
  });
});
