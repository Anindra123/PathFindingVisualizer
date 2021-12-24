import {
  Node,
  GetNeighbours,
  GetShotestPathList,
  animateNodes,
} from "../node.js";
import { nodeColor } from "../nodeColor.js";

function DFSAlgo(grid, startNode) {
  let neighbours = [];
  let stack = [];
  let animateNodes = [];
  stack.push(startNode);
  while (stack.length > 0) {
    let currNode = stack.pop();
    if (currNode.getisEnd()) {
      return animateNodes;
    }
    neighbours.length = 0;
    GetNeighbours(neighbours, currNode.row, currNode.col, grid);
    for (let i = 0; i < neighbours.length; i++) {
      let visitedNode = neighbours[i];
      if (neighbours[i].getisEnd()) {
        neighbours[i].setParentNode(currNode);
        stack.push(neighbours[i]);
      }
      if (neighbours[i].getisNotVisited()) {
        neighbours[i].setDiscovered();
        neighbours[i].setParentNode(currNode);
        let node = new Node(
          visitedNode.row,
          visitedNode.col,
          visitedNode.width,
          visitedNode.total_rows
        );
        node.setDiscovered();
        animateNodes.push(node);
        stack.push(neighbours[i]);
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

export function runDFSAlgo(ctx, grid, startNode, endNode) {
  let nodesToAnimate = DFSAlgo(grid, startNode);
  let shortestPathNodes = GetShotestPathList(endNode);
  animateNodes(ctx, nodesToAnimate, shortestPathNodes);
}
