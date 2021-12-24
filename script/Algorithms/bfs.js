import {
  Node,
  GetNeighbours,
  GetShotestPathList,
  animateNodes,
} from "../node.js";
import { nodeColor } from "../nodeColor.js";

function BfsAlgo(grid, startNode) {
  let neighbours = [];
  let queue = [];
  let animateNodes = [];
  queue.push(startNode);
  while (queue.length > 0) {
    let visitedNode = queue.shift();
    if (visitedNode.getisEnd()) {
      return animateNodes;
    }
    neighbours.length = 0;
    GetNeighbours(neighbours, visitedNode.row, visitedNode.col, grid);
    for (let i = 0; i < neighbours.length; i++) {
      let neighbourNode = neighbours[i];
      neighbourNode.setParentNode(visitedNode);
      if (neighbourNode.getisNotVisited()) {
        neighbourNode.setDiscovered();
        let node = new Node(
          neighbourNode.row,
          neighbourNode.col,
          neighbourNode.width,
          neighbourNode.total_rows
        );
        node.setDiscovered();
        animateNodes.push(node);
      }
      queue.push(neighbourNode);
    }
    if (!visitedNode.getisStart()) {
      visitedNode.setVisited();
      let node = new Node(
        visitedNode.row,
        visitedNode.col,
        visitedNode.width,
        visitedNode.total_rows
      );
      node.setVisited();
      animateNodes.push(node);
    }
  }
  return animateNodes;
}

export function runBFSAlgo(ctx, grid, startNode, endNode) {
  let nodesToAnimate = BfsAlgo(grid, startNode);
  let shortestPathNodes = GetShotestPathList(endNode);
  animateNodes(ctx, nodesToAnimate, shortestPathNodes);
}
