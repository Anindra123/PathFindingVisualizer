import { Node } from "../node.js";
const discoveredCol = "rgb(4,180,255)";
const visitedCol = "rgb(100,255,255)";
const discovereNodes = [];
const visitedNodes = [];
function GetNeighbours(q, row, col, grid) {
  let upNode;
  let downNode;
  let leftNode;
  let rightNode;
  try {
    if (row - 1 >= 0) {
      upNode = grid[row - 1][col];
    }
  } catch {
    upNode = undefined;
  }
  try {
    if (col - 1 >= 0) {
      leftNode = grid[row][col - 1];
    }
  } catch {
    leftNode = undefined;
  }
  try {
    downNode = grid[row + 1][col];
  } catch {
    downNode = undefined;
  }
  try {
    rightNode = grid[row][col + 1];
  } catch {
    rightNode = undefined;
  }
  if (
    rightNode !== undefined &&
    (rightNode.getisNotVisited() || rightNode.getisEnd())
  ) {
    q.push(rightNode);
  }
  if (upNode !== undefined && (upNode.getisNotVisited() || upNode.getisEnd())) {
    q.push(upNode);
  }
  if (
    leftNode !== undefined &&
    (leftNode.getisNotVisited() || leftNode.getisEnd())
  ) {
    q.push(leftNode);
  }
  if (
    downNode !== undefined &&
    (downNode.getisNotVisited() || downNode.getisEnd())
  ) {
    q.push(downNode);
  }
}
function GetShotestPathList(endNode) {
  let shortestPathList = [];
  let currNode = endNode;
  while (currNode !== null) {
    shortestPathList.unshift(currNode);
    currNode = currNode.getParentNode();
  }
  return shortestPathList;
}

function BfsAlgo(queue, grid, startNode, ctx) {
  let animateNodes = [];
  queue.push(startNode);
  GetNeighbours(queue, startNode.row, startNode.col, grid);
  while (queue.length > 0) {
    let visitedNode = queue.shift();
    if (!visitedNode.getisStart() && visitedNode.getisDiscovered()) {
      grid[visitedNode.row][visitedNode.col].setVisited(ctx);
      let node = new Node(
        visitedNode.row,
        visitedNode.col,
        visitedNode.width,
        visitedNode.total_rows
      );
      node.setVisited();
      animateNodes.push(node);
    }
    GetNeighbours(queue, visitedNode.row, visitedNode.col, grid);
    for (let i = 0; i < queue.length; i++) {
      let neighbourNode = queue[i];
      if (neighbourNode.getisEnd()) {
        grid[neighbourNode.row][neighbourNode.col].setParentNode(visitedNode);
        return animateNodes;
      }
      if (neighbourNode.getisNotVisited()) {
        grid[neighbourNode.row][neighbourNode.col].setDiscovered(ctx);
        grid[neighbourNode.row][neighbourNode.col].setParentNode(visitedNode);
        let node = new Node(
          neighbourNode.row,
          neighbourNode.col,
          neighbourNode.width,
          neighbourNode.total_rows
        );
        node.setDiscovered();
        animateNodes.push(node);
      }
    }
  }
  return animateNodes;
}

export function runBFSAlgo(ctx, grid, startNode, endNode) {
  const queue = [];
  let animateNodes = BfsAlgo(queue, grid, startNode, ctx);
  console.log(animateNodes);
  let shortestPathNodes = GetShotestPathList(endNode);
  let animCounter = 0;
  for (let i = 0; i < animateNodes.length; i++) {
    setTimeout(() => {
      if (animateNodes[i].getisDiscovered()) {
        animateNodes[i].drawNode(ctx, discoveredCol);
      }
      if (animateNodes[i].getisVisited()) {
        animateNodes[i].drawNode(ctx, visitedCol);
      }
      animCounter++;
      if (animCounter === animateNodes.length) {
        for (let i = 1; i < shortestPathNodes.length - 1; i++) {
          setTimeout(() => {
            shortestPathNodes[i].drawNode(ctx, "rgb(255,255,4)");
          }, i * 50);
        }
      }
    }, i * 5);
  }
}
