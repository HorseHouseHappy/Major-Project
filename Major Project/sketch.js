// Crypt Of The Necrodancer 2: the electric boogaloo
// Liam Ma
// 1/3/2020
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
let currentTime;
let timeOfBeat = 520;
let allowedVariation = 100;
let e1m1Music;
let currentSong;
let begin = false;

function preload() {
  // loading level from txt file 
  level = "levels/e1m1.txt"
  lines = loadStrings(level);

  floor = loadImage("assets/sprites/e1m1_floor.png");
  player = loadImage("assets/sprites/cadence+.png");
  wall = loadImage("assets/sprites/e1m1_wall_stone_half.png");
  // coins = loadImage("assets/sprites/coins.png");
  slime = loadImage("assets/sprites/green_slime.png");
  skeleton = loadImage("assets/sprites/white_skeleton.png");
  heart = loadImage("assets/sprites/heart.png");
  
  e1m1Music = loadSound("assets/music/e1m1_disco_descent.mp3");
}

function setup() {
  createCanvas(1200, 900);
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

  currentSong = e1m1Music;
  tiles[playerX][playerY] = "P";
}

function draw() {
  currentTime = millis();
  background(0);
  display();
  beatVisual();
}


function display() {
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      showTile(tiles[x][y], x, y);
    }
  } 
  beatVisual();
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
  else {
    image(floor, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
}

function keyPressed() {
  if (key === "s" && currentTime % timeOfBeat >= 0 && currentTime % timeOfBeat <= 100 ||
  currentTime % timeOfBeat >= timeOfBeat - allowedVariation && currentTime % timeOfBeat <= timeOfBeat) {
    movePlayer(playerX+1, playerY, playerX, playerY, "right");
  }
  if (key === "w" && currentTime % timeOfBeat >= 0 && currentTime % timeOfBeat <= 100 ||
  currentTime % timeOfBeat >= timeOfBeat - allowedVariation && currentTime % timeOfBeat <= timeOfBeat) {
    movePlayer(playerX-1, playerY, playerX, playerY, "left");
  }
  if (key === "d" && currentTime % timeOfBeat >= 0 && currentTime % timeOfBeat <= 100 ||
  currentTime % timeOfBeat >= timeOfBeat - allowedVariation && currentTime % timeOfBeat <= timeOfBeat) {
    movePlayer(playerX, playerY+1, playerX, playerY, "down");
  }
  if (key === "a" && currentTime % timeOfBeat >= 0 && currentTime % timeOfBeat <= 100 ||
  currentTime % timeOfBeat >= timeOfBeat - allowedVariation && currentTime % timeOfBeat <= timeOfBeat) {
    movePlayer(playerX, playerY-1, playerX, playerY, "up");
  }
  if (keyCode === ENTER) {
    begin = true;
  }

}

function movePlayer(x, y, oldX, oldY, direction) {
  if (x >= 0 && x < tilesWide && y >= 0 && y < tilesHigh && tiles[y][x] !== "#") {
    tiles[y][x] = "P";
    tiles[oldY][oldX] = ".";

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

function beatVisual() {
  let heartWidth = 50;
  let heartHeight = 50;
  let durationOfBeat = 50;
  let lastSwitchTime = 0;
  let timeToSwitch = false;

  image(heart, (width /2) - (heartWidth / 2), height - 120, heartWidth, heartHeight);

  if (currentTime - lastSwitchTime > durationOfBeat) {
    timeToSwitch = !timeToSwitch;
    lastSwitchTime = currentTime;
  }
  
  if (timeToSwitch) {
   heartWidth += 15;
   heartHeight += 15;
  }
  
  else {
    heartWidth = 50;
    heartHeight = 50;
  }
}

class Slime {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  moveSlime() {
    if (currentTime % timeOfBeat === 0) {
      this.y += 1;

    }
  }
}