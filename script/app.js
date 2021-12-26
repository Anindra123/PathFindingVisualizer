import { runAstarAlgo } from "./Algorithms/Astar.js";
import { runBFSAlgo } from "./Algorithms/bfs.js";
import { runDFSAlgo } from "./Algorithms/dfs.js";
import { runDijakstraAlgo } from "./Algorithms/Dijakstra.js";
import { GenerateMaze } from "./Algorithms/RecursiveBackTack.js";
import { Node } from "./node.js";
import * as gridFunc from "./grid.js";

window.addEventListener("load", () => {
  const myGitLink = document.querySelector(".myGitHubAcc");
  const githubRepo = document.querySelector(".projRepo");
  const grid = document.querySelector("#grid");
  const ctx = grid.getContext("2d");
  const width = 1000;
  const rows = 50;
  const gridLayer = document.querySelector("#grid-layer");
  const visualizeBtn = document.querySelector(".visualizeBtn");
  const selectAlgorithm = document.querySelector(".algorithm");
  const clearPathBtn = document.querySelector(".clearPath");
  const resetGridBtn = document.querySelector(".resetGrid");
  const generateMazeBtn = document.querySelector(".generateMaze");
  const messageBox = document.querySelector(".message");
  const context = gridLayer.getContext("2d");
  gridLayer.width = width;
  gridLayer.height = width / 2;
  grid.width = width;
  grid.height = width / 2;
  const cellList = gridFunc.getCellList(rows, width);
  gridFunc.drawGrid(ctx, cellList, rows, width);
  gridFunc.drawGridLines(context, rows, width);
  let drawWall = false;
  let removeWall = false;
  let drawStart = false;
  let drawEnd = false;
  let startNode = null;
  let endNode = null;
  selectAlgorithm.selectedIndex = -1;
  visualizeBtn.disabled = true;
  let [sNode, eNode] = gridFunc.pickRandStartAndEnd(ctx, cellList);
  startNode = sNode;
  endNode = eNode;
  drawStart = true;
  drawEnd = true;
  githubRepo.addEventListener("click", () => {
    window.open("https://github.com/Anindra123/PathFindingVisualizer");
  });
  myGitLink.addEventListener("click", () => {
    window.open("https://github.com/Anindra123");
  });
  const enableBtnAndGrid = () => {
    selectAlgorithm.disabled = false;
    visualizeBtn.disabled = false;
    grid.style.pointerEvents = "all";
  };
  grid.addEventListener("click", (e) => {
    let [row, col] = gridFunc.getCellPos(e.offsetX, e.offsetY, width, rows);
    let selectedNode = cellList[row][col];
    if (e.button == 0) {
      if (
        selectedNode.getisNotVisited() &&
        !selectedNode.getisWall() &&
        !drawStart
      ) {
        selectedNode.setStart(ctx);
        startNode = selectedNode;
        drawStart = true;
      } else if (
        selectedNode.getisNotVisited() &&
        !selectedNode.getisWall() &&
        !drawEnd
      ) {
        selectedNode.setEnd(ctx);
        endNode = selectedNode;
        drawEnd = true;
      } else if (selectedNode.getisStart()) {
        drawStart = false;
        startNode = null;
        selectedNode.setNotVisited(ctx);
      } else if (selectedNode.getisEnd()) {
        drawEnd = false;
        endNode = null;
        selectedNode.setNotVisited(ctx);
      }
    }
  });
  grid.addEventListener("mousedown", (e) => {
    if (e.button == 0) {
      drawWall = true;
    }
    if (e.button == 1) {
      removeWall = true;
    }
  });
  grid.addEventListener("mousemove", (e) => {
    let [row, col] = gridFunc.getCellPos(e.offsetX, e.offsetY, width, rows);
    try {
      if (drawWall) {
        gridFunc.drawWallNode(ctx, cellList, row, col);
      }
      if (removeWall) {
        gridFunc.drawNotVisitedNode(ctx, cellList, row, col);
      }
    } catch {
      drawWall = false;
      removeWall = false;
    }
  });
  grid.addEventListener("mouseout", () => {
    drawWall = false;
    removeWall = false;
  });
  grid.addEventListener("mouseup", () => {
    drawWall = false;
    removeWall = false;
  });
  selectAlgorithm.addEventListener("change", () => {
    let selectedVal =
      selectAlgorithm.options[selectAlgorithm.selectedIndex].text;
    switch (selectedVal) {
      case "BFS":
        visualizeBtn.textContent = "Visualize BFS";
        messageBox.textContent =
          "BFS or Breadth First Search algorithm finds the shortest path by travelling each of its neighbouring node or checking all nodes at current breadth.Doesn't work for weighted graphs.";
        messageBox.style.color = "black";
        visualizeBtn.disabled = false;
        break;
      case "DFS":
        visualizeBtn.textContent = "Visualize DFS";
        messageBox.textContent =
          "DFS or Depth first search algorithm works by going to the depth of a node and then backtracking.Doesn't work for weighted graphs.";
        messageBox.style.color = "black";
        visualizeBtn.disabled = false;
        break;
      case "Astar":
        visualizeBtn.textContent = "Visualize Astar";
        messageBox.textContent =
          "A* is an informative search algorithm that works by calculating the distance of each node and huerisitic distance.Works for weighted graph aswell, here the huerisitic is manhattan distance.";
        messageBox.style.color = "black";
        visualizeBtn.disabled = false;
        break;
      case "Dijakstra":
        visualizeBtn.textContent = "Visualize Dijakstra";
        messageBox.textContent =
          "Dijakstra is a weighted graph search algorithm that works by picking the shortest distance neighbouring node from each node.";
        messageBox.style.color = "black";
        visualizeBtn.disabled = false;
        break;
      default:
        visualizeBtn.textContent = "Visualize";
        visualizeBtn.disabled = true;
        break;
    }
  });
  const disableButtonAndGrid = () => {
    visualizeBtn.disabled = true;
    clearPathBtn.disabled = true;
    resetGridBtn.disabled = true;
    generateMazeBtn.disabled = true;
    selectAlgorithm.disabled = true;
    grid.style.pointerEvents = "none";
  };
  const enableAll = () => {
    visualizeBtn.disabled = false;
    clearPathBtn.disabled = false;
    resetGridBtn.disabled = false;
    generateMazeBtn.disabled = false;
    selectAlgorithm.disabled = false;
    grid.style.pointerEvents = "all";
  };
  visualizeBtn.addEventListener("click", (e) => {
    if (startNode !== null && endNode !== null) {
      disableButtonAndGrid();
    } else {
      messageBox.textContent = "Start Node and End Node needs to be selected";
      messageBox.style.color = "red";
    }
    switch (e.target.textContent) {
      case "Visualize BFS":
        if (startNode !== null && endNode !== null) {
          messageBox.textContent =
            "BFS or Breadth First Search algorithm finds the shortest path by travelling each of its neighbouring node or checking all nodes at current breadth.Doesn't work for weighted graphs.";
          messageBox.style.color = "black";
          runBFSAlgo(ctx, cellList, startNode, endNode);
        }
        break;
      case "Visualize DFS":
        if (startNode !== null && endNode !== null) {
          messageBox.textContent =
            "DFS or Depth first search algorithm works by going to the depth of a node and then backtracking.Doesn't work for weighted graphs.";
          messageBox.style.color = "black";
          runDFSAlgo(ctx, cellList, startNode, endNode);
        }
        break;
      case "Visualize Astar":
        if (startNode !== null && endNode !== null) {
          messageBox.textContent =
            "A* is an informative search algorithm that works by calculating the distance of each node and huerisitic distance.Works for weighted graph aswell, here the huerisitic is manhattan distance.";
          messageBox.style.color = "black";
          runAstarAlgo(ctx, cellList, startNode, endNode);
        }
        break;
      case "Visualize Dijakstra":
        if (startNode !== null && endNode !== null) {
          messageBox.textContent =
            "Dijakstra is a weighted graph search algorithm that works by picking the shortest distance neighbouring node from each node.";
          messageBox.style.color = "black";
          runDijakstraAlgo(ctx, cellList, startNode, endNode);
        }
        break;
      default:
        messageBox.textContent =
          "An algorithm must be selected for visualization";
        messageBox.style.color = "red";
        enableAll();
        break;
    }
  });
  resetGridBtn.addEventListener("click", () => {
    enableBtnAndGrid();
    cellList.forEach((row) => {
      row.forEach((cell) => {
        cell.setNotVisited(ctx);
        cell.resetNode();
      });
    });
    let [sNode, eNode] = gridFunc.pickRandStartAndEnd(ctx, cellList);
    startNode = sNode;
    endNode = eNode;
    drawStart = true;
    drawEnd = true;
  });
  let list = [];
  generateMazeBtn.addEventListener("click", () => {
    if (startNode != null && endNode != null) {
      startNode.setNotVisited(ctx);
      startNode.resetNode();
      startNode = null;
      drawStart = false;
      endNode.setNotVisited(ctx);
      endNode.resetNode();
      endNode = null;
      drawEnd = false;
    }
    disableButtonAndGrid();
    cellList.forEach((row) => {
      row.forEach((cell) => {
        cell.setNotVisited(ctx);
        cell.resetNode();
      });
    });
    GenerateMaze(ctx, cellList, list).then((val) => {
      if (val) {
        visualizeBtn.disabled = false;
        selectAlgorithm.disabled = false;
        generateMazeBtn.disabled = false;
        grid.style.pointerEvents = "all";
        let [sNode, eNode] = gridFunc.pickRandStartAndEnd(ctx, cellList);
        startNode = sNode;
        endNode = eNode;
        drawStart = true;
        drawEnd = true;
      }
    });
  });
  clearPathBtn.addEventListener("click", () => {
    if (cellList.length == 0) {
      return;
    }
    enableBtnAndGrid();
    cellList.forEach((row) => {
      row.forEach((cell) => {
        if (cell.getisDiscovered() || cell.getisVisited()) {
          cell.setNotVisited(ctx);
          cell.resetNode();
        }
        if (cell.getisStart()) {
          cell.resetNode();
        }
        if (cell.getisEnd()) {
          cell.resetNode();
        }
      });
    });
  });
});
