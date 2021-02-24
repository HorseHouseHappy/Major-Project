// Crypt Of The Necrodancer 2: the electric boogaloo
// Liam Ma
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let floor, wall, stoneWall, skeleton, player, coins;
let tiles;
let tilesHigh, tilesWide;
let tileWidth, tileHeight;
let level;
let lines;
let playerX = 10;
let playerY = 10;

function preload() {
  // loading level from txt file 
  level = "levels/e1m1.txt"
  lines = loadStrings(level);

  levelBackground = loadImage("assets/sprites/e1m1_background.png");
  player = loadImage("assets/sprites/cadence.gif");
  wall = loadImage("assets/sprites/e1m1_wall_stone_half.png");
  // coins = loadImage("assets/sprites/coins.png");
  slime = loadImage("assets/sprites/green_slime.png");
  skeleton = loadImage("assets/sprites/white_skeleton.png");

  // load other sprites as needed
  
}

function setup() {
  createCanvas(1000, 750);
  tilesHigh = lines.length;
  tilesWide = lines[0].length;

  tileWidth = width / tilesWide;
  tileHeight = height / tilesHigh;

  tiles = createEmpty2dArray(tilesWide, tilesHigh);

  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      let tileType = lines[y][x];
      tiles[x][y] = tileType;
    }
  }
}

function draw() {
  background(255);
  display();
}

function display() {
  image(levelBackground, 0, 0, width, height);

  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      showTile(tiles[x][y], x, y);
    }
  }
}

function createEmpty2dArray(cols, rows) {
  let randomGrid = [];
  for (let x = 0; x < cols; x++) {
    randomGrid.push([]);
    for (let y = 0; y < rows; y++) {
      randomGrid[x].push(0);
    }
  }
  return randomGrid;
}

function showTile(location, x, y) {
  if (location === "#") {
    image(wall, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "C") {
    image(coins, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "B") {
    image(skeleton, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "P") {
    image(player, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "S") {
    image(slime, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  // else {
  //   image(floor, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  // }
}

function keyPressed() {
  if (key === "d") {
    movePlayer(playerX+1, playerY, playerX, playerY, "right");
  }
  if (key === "a") {
    movePlayer(playerX-1, playerY, playerX, playerY, "left");
  }
  if (key === "s") {
    movePlayer(playerX, playerY+1, playerX, playerY, "down");
  }
  if (key === "w") {
    movePlayer(playerX, playerY-1, playerX, playerY, "up");
  }
  if (keyCode === RIGHT_ARROW) {
    movePlayer(playerX+1, playerY, playerX, playerY, "right");
  }
  if (keyCode === LEFT_ARROW) {
    movePlayer(playerX-1, playerY, playerX, playerY, "left");
  }
  if (keyCode === DOWN_ARROW) {
    movePlayer(playerX, playerY+1, playerX, playerY, "down");
  }
  if (keyCode === UP_ARROW) {
    movePlayer(playerX, playerY-1, playerX, playerY, "up");
  }
}

function movePlayer(x, y, oldX, oldY, direction) {
  if (x >= 0 && x < tilesWide && y >= 0 && y < tilesHigh && tiles[y][x] !== 1) {
    tiles[y][x] = 9;
    tiles[oldY][oldX] = 0;

    if (direction === "right") {
      playerX += 1;
    }
    if (direction === "left") {
      playerX -= 1;
    }
    if (direction === "down") {
      playerY += 1;
    }
    if (direction === "up") {
      playerY -= 1;
    }
  }
}