import { nodeColor } from "./nodeColor.js";

export class Node {
  constructor(_row, _col, _width, _total_rows) {
    this.row = _row;
    this.col = _col;
    this.x = _col * _width;
    this.y = _row * _width;
    this.width = _width;
    this.total_rows = _total_rows;
    this.notVisited = false;
    this.discovered = false;
    this.visited = false;
    this.wall = false;
    this.start = false;
    this.end = false;
    this.distance = Infinity;
    this.g_score = Infinity;
    this.f_score = Infinity;
    this.neighbourNodes = [];
    this.parentNode = null;
  }
  drawNode(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.width);
  }
  resetNodeState() {
    this.notVisited = false;
    this.visited = false;
    this.wall = false;
    this.start = false;
    this.end = false;
    this.discovered = false;
  }
  resetNode() {
    this.distance = Infinity;
    this.g_score = Infinity;
    this.f_score = Infinity;
    this.neighbourNodes = [];
    this.parentNode = null;
  }
  setNotVisited(ctx) {
    this.resetNodeState();
    this.notVisited = true;
    this.drawNode(ctx, nodeColor.notVisitedCol);
  }
  setVisited() {
    this.resetNodeState();
    this.visited = true;
  }
  setWall(ctx) {
    this.resetNodeState();
    this.wall = true;
    this.drawNode(ctx, nodeColor.wallCol);
  }
  setStart(ctx) {
    this.resetNodeState();
    this.start = true;
    this.drawNode(ctx, nodeColor.startCol);
  }
  setEnd(ctx) {
    this.resetNodeState();
    this.end = true;
    this.drawNode(ctx, nodeColor.endCol);
  }
  setParentNode(node) {
    this.parentNode = node;
  }
  setDiscovered() {
    this.resetNodeState();
    this.discovered = true;
  }
  getisNotVisited() {
    return this.notVisited;
  }
  getisWall() {
    return this.wall;
  }
  getisVisited() {
    return this.visited;
  }
  getisStart() {
    return this.start;
  }
  getisEnd() {
    return this.end;
  }
  getisDiscovered() {
    return this.discovered;
  }

  getParentNode() {
    return this.parentNode;
  }
  getNodePos() {
    return [this.row, this.col];
  }
}

export function GetNeighbours(q, row, col, grid) {
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

export function GetShotestPathList(endNode) {
  let shortestPathList = [];
  let currNode = endNode;
  while (currNode !== null) {
    shortestPathList.unshift(currNode);
    currNode = currNode.getParentNode();
  }
  return shortestPathList;
}
