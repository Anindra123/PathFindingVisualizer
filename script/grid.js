import { runAstarAlgo } from "./Algorithms/Astar.js";
import { runBFSAlgo } from "./Algorithms/bfs.js";
import { runDFSAlgo } from "./Algorithms/dfs.js";
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
  const rows = 50;
  const gridLayer = document.querySelector("#grid-layer");
  const runBfsBtn = document.querySelector(".runBFS");
  const runAstarBtn = document.querySelector(".runAstar");
  const resetGridBtn = document.querySelector(".resetGrid");
  const runDFSBtn = document.querySelector(".runDFS");
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
        startNode = null;
        selectedNode.setNotVisited(ctx);
      } else if (selectedNode.getisEnd()) {
        drawEnd = false;
        endNode = null;
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
    if (startNode != null && endNode != null) {
      grid.style.pointerEvents = "none";
      runBFSAlgo(ctx, cellList, startNode, endNode);
    }
  });
  runAstarBtn.addEventListener("click", () => {
    if (startNode != null && endNode != null) {
      grid.style.pointerEvents = "none";
      runAstarAlgo(ctx, cellList, startNode, endNode);
    }
  });
  runDFSBtn.addEventListener("click", () => {
    if (startNode != null && endNode != null) {
      grid.style.pointerEvents = "none";
      runDFSAlgo(ctx, cellList, startNode, endNode);
    }
  });
  resetGridBtn.addEventListener("click", () => {
    if (cellList.length == 0) {
      return;
    }
    grid.style.pointerEvents = "all";
    cellList.forEach((row) => {
      row.forEach((cell) => {
        if (cell.getisDiscovered() || cell.getisVisited()) {
          cell.setNotVisited(ctx);
          cell.resetNode();
        }
        if (cell.getisStart()) {
          cell.resetNode();
        }
        if (cell.getisEnd()) {
          cell.resetNode();
        }
      });
    });
  });
});
