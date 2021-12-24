import {
  GetNeighbours,
  GetShotestPathList,
  animateNodes,
  Node,
  GetWeightedNeighbours,
} from "../node.js";
import { nodeColor } from "../nodeColor.js";

function DijakstraAlgo(grid, startNode) {
  let neighbours = [];
  let queue = [];
  let animateNodes = [];
  startNode.distance = 0;
  queue.push(startNode);
  queue.sort((a, b) => {
    return a.distance - b.distance;
  });
  while (queue.length > 0) {
    let currNode = queue.shift();
    if (currNode.getisEnd()) {
      return animateNodes;
    }
    neighbours.length = 0;
    GetWeightedNeighbours(neighbours, currNode.row, currNode.col, grid);
    for (let i = 0; i < neighbours.length; i++) {
      let visitedNode = neighbours[i];
      let temp = currNode.distance + 1;
      if (temp < visitedNode.distance) {
        visitedNode.distance = temp;
        if (visitedNode.getisNotVisited()) {
          visitedNode.setDiscovered();
          let node = new Node(
            visitedNode.row,
            visitedNode.col,
            visitedNode.width,
            visitedNode.total_rows
          );
          node.setDiscovered();
          animateNodes.push(node);
        }
        visitedNode.setParentNode(currNode);
        queue.push(visitedNode);
        queue.sort((a, b) => {
          return a.distance - b.distance;
        });
      }
    }
    if (!currNode.getisStart()) {
      currNode.setVisited();
      let node = new Node(
        currNode.row,
        currNode.col,
        currNode.width,
        currNode.total_rows
      );
      node.setVisited();
      animateNodes.push(node);
    }
  }
  return animateNodes;
}

export function runDijakstraAlgo(ctx, grid, startNode, endNode) {
  let nodesToAnimate = DijakstraAlgo(grid, startNode);
  let shortestPathList = GetShotestPathList(endNode);
  animateNodes(ctx, nodesToAnimate, shortestPathList);
}
