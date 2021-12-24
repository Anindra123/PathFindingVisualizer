import {
  Node,
  GetNeighbours,
  GetShotestPathList,
  animateNodes,
  GetWeightedNeighbours,
} from "../node.js";
import { nodeColor } from "../nodeColor.js";

function hueristic(startNode, endNode) {
  let [sRow, sCol] = startNode.getNodePos();
  let [eRow, eCol] = endNode.getNodePos();
  return Math.abs(sRow - eRow) + Math.abs(sCol - eCol);
}

function AstarAlgo(ctx, grid, startNode, endNode) {
  let neighbours = [];
  let open_list = [];
  let animatNodes = [];
  startNode.g_score = 0;
  startNode.h_score = hueristic(startNode, endNode);
  startNode.distance = startNode.g_score + startNode.h_score;
  open_list.push(startNode);
  open_list.sort(function (a, b) {
    return a.distance - b.distance;
  });

  while (open_list.length > 0) {
    let currNode = open_list.shift();
    if (currNode.getisEnd()) {
      return animatNodes;
    }
    neighbours.length = 0;
    GetWeightedNeighbours(neighbours, currNode.row, currNode.col, grid);

    for (let i = 0; i < neighbours.length; i++) {
      let visitedNode = neighbours[i];

      let temp_score = currNode.g_score + 1;

      if (temp_score < visitedNode.g_score) {
        visitedNode.g_score = temp_score;
        visitedNode.h_score = hueristic(visitedNode, endNode);
        visitedNode.distance = visitedNode.g_score + visitedNode.h_score;
        visitedNode.setParentNode(currNode);
        if (visitedNode.getisNotVisited()) {
          visitedNode.setDiscovered();
          let discoverdAnimateNode = new Node(
            visitedNode.row,
            visitedNode.col,
            visitedNode.width,
            visitedNode.total_rows
          );
          discoverdAnimateNode.setDiscovered();
          animatNodes.push(discoverdAnimateNode);
        }
        open_list.push(visitedNode);

        open_list.sort(function (a, b) {
          return a.distance - b.distance;
        });
      }
    }

    if (!currNode.getisStart()) {
      currNode.setVisited();
      let visitedAnimateNode = new Node(
        currNode.row,
        currNode.col,
        currNode.width,
        currNode.total_rows
      );
      visitedAnimateNode.setVisited();
      animatNodes.push(visitedAnimateNode);
    }
  }
  return animatNodes;
}

export function runAstarAlgo(ctx, grid, startNode, endNode) {
  let nodesToAnimate = AstarAlgo(ctx, grid, startNode, endNode);
  let shortestPathList = GetShotestPathList(endNode);
  animateNodes(ctx, nodesToAnimate, shortestPathList);
}
