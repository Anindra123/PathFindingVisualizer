function intializeGrid(ctx, grid) {
  grid.forEach((element) => {
    element.forEach((row) => {
      row.setWall(ctx);
      row.resetNode();
    });
  });
}

function GetWallNeighbours(list, row, col, grid) {
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
  if (rightNode !== undefined && rightNode.getisWall()) {
    list.push(rightNode);
  }
  if (upNode !== undefined && upNode.getisWall()) {
    list.push(upNode);
  }
  if (leftNode !== undefined && leftNode.getisWall()) {
    list.push(leftNode);
  }
  if (downNode !== undefined && downNode.getisWall()) {
    list.push(downNode);
  }
}

function recursiveBackTrackAlgo(ctx, grid, node) {
  intializeGrid(ctx, grid);
  let s = [];
  let neighbours = [];
  node.setNotVisited(ctx);
  s.push(node);
  while (s.length > 0) {
    let currNode = s.pop();
    neighbours.length = 0;
    GetWallNeighbours(neighbours, currNode.row, currNode.col, grid);
    if (neighbours.length > 0) {
      let rand = Math.floor(Math.random() * neighbours.length);
      for (let i = 0; i < neighbours.length; i++) {
        neighbours[i].setNotVisited(ctx);
        if (i != rand) {
          s.push(neighbours[i]);
        }
      }
      s.push(neighbours[rand]);
    }
  }
}

export function GenerateMaze(ctx, grid) {
  let node = grid[0][0];
  recursiveBackTrackAlgo(ctx, grid, node);
}
