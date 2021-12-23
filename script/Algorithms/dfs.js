import { Node, GetNeighbours, GetShotestPathList } from "../node.js";
import { nodeColor } from "../nodeColor.js";

function DFSAlgo(grid, startNode) {
  let neighbours = [];
  let stack = [];
  let animateNodes = [];
  stack.push(startNode);
  while (stack.length > 0) {
    let currNode = stack.pop();
    GetNeighbours(neighbours, currNode.row, currNode.col, grid);
    for (let i = 0; i < neighbours.length; i++) {
      let visitedNode = neighbours[i];
      if (neighbours[i].getisEnd()) {
        neighbours[i].setParentNode(currNode);
        return animateNodes;
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
  let animateNodes = DFSAlgo(grid, startNode);
  let shortestPathNodes = GetShotestPathList(endNode);
  let animCounter = 0;
  for (let index = 0; index < animateNodes.length; index++) {
    setTimeout(() => {
      if (animateNodes[index].getisDiscovered()) {
        animateNodes[index].drawNode(ctx, nodeColor.discoveredCol);
      }
      if (animateNodes[index].getisVisited()) {
        animateNodes[index].drawNode(ctx, nodeColor.visitedCol);
      }
      animCounter++;
      if (animCounter == animateNodes.length) {
        for (let i = 1; i < shortestPathNodes.length - 1; i++) {
          setTimeout(() => {
            shortestPathNodes[i].drawNode(ctx, nodeColor.shortPath);
          }, i * 50);
        }
      }
    }, index * 5);
  }
}
