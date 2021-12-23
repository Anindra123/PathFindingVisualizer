import { Node, GetNeighbours, GetShotestPathList } from "../node.js";
import { nodeColor } from "../nodeColor.js";

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
  let shortestPathNodes = GetShotestPathList(endNode);
  let animCounter = 0;
  for (let i = 0; i < animateNodes.length; i++) {
    setTimeout(() => {
      if (animateNodes[i].getisDiscovered()) {
        animateNodes[i].drawNode(ctx, nodeColor.discoveredCol);
      }
      if (animateNodes[i].getisVisited()) {
        animateNodes[i].drawNode(ctx, nodeColor.visitedCol);
      }
      animCounter++;
      if (animCounter === animateNodes.length) {
        for (let i = 1; i < shortestPathNodes.length - 1; i++) {
          setTimeout(() => {
            shortestPathNodes[i].drawNode(ctx, nodeColor.shortPath);
          }, i * 50);
        }
      }
    }, i * 5);
  }
}
