import { drawWallNode, pickRandStartAndEnd } from "../grid.js";
import { Node } from "../node.js";

function intializeGrid(ctx, grid) {
  grid.forEach((element) => {
    element.forEach((row) => {
      row.setWall(ctx);
      row.resetNode();
    });
  });
}

function GetWallNeighbours(list, row, col, grid, choices) {
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
  for (let i = 0; i < choices.length; i++) {
    let path_row = row + choices[i][0];
    let path_col = col + choices[i][1];
    let pathNode;
    try {
      pathNode = grid[path_row][path_col];
    } catch {
      pathNode = undefined;
    }
    if (pathNode !== undefined && pathNode.getisWall()) {
      if (choices[i][1] == 2) {
        if (rightNode !== undefined && rightNode.getisWall()) {
          list.push([rightNode, pathNode]);
        }
      } else if (choices[i][1] == -2) {
        if (leftNode !== undefined && leftNode.getisWall()) {
          list.push([leftNode, pathNode]);
        }
      } else if (choices[i][0] == 2) {
        if (downNode !== undefined && downNode.getisWall()) {
          list.push([downNode, pathNode]);
        }
      } else if (choices[i][0] == -2) {
        if (upNode !== undefined && upNode.getisWall()) {
          list.push([upNode, pathNode]);
        }
      }
    }
  }
}

function recursiveBackTrackAlgo(ctx, grid, node) {
  intializeGrid(ctx, grid);
  let s = [];
  let neighbours = [];
  let animateNodes = [];
  node.setNotVisited(ctx);

  animateNodes.push(node);
  let choices = [
    [-2, 0],
    [0, 2],
    [2, 0],
    [0, -2],
  ];
  GetWallNeighbours(neighbours, node.row, node.col, grid, choices);
  let randIdx = Math.floor(Math.random() * neighbours.length);
  s.push(neighbours[randIdx]);
  while (s.length > 0) {
    let path = s[s.length - 1];
    let front_node = path[1];
    animateNodes.push(front_node);
    let between_node = path[0];
    animateNodes.push(between_node);
    front_node.setNotVisited(ctx);
    between_node.setNotVisited(ctx);
    neighbours.length = 0;
    GetWallNeighbours(
      neighbours,
      front_node.row,
      front_node.col,
      grid,
      choices
    );
    if (neighbours.length > 0) {
      let randIdx = Math.floor(Math.random() * neighbours.length);
      s.push(neighbours[randIdx]);
    } else {
      s.pop();
    }
  }
  return animateNodes;
}

export function GenerateMaze(ctx, grid, list) {
  let node =
    grid[Math.floor(Math.random() * grid.length)][
      Math.floor(Math.random() * grid[0].length)
    ];
  let nodesToAnimate = recursiveBackTrackAlgo(ctx, grid, node);
  intializeGrid(ctx, grid);
  let animeCounter = 0;
  const promise = new Promise((resolve, reject) => {
    for (let i = 0; i < nodesToAnimate.length; i++) {
      setTimeout(() => {
        nodesToAnimate[i].setNotVisited(ctx);
        animeCounter++;
        if (animeCounter === nodesToAnimate.length) {
          resolve(true);
        }
      }, i * 10);
    }
  });
  return promise;
}
