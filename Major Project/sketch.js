// Crypt Of The Necrodancer 2: the electric boogaloo
// Liam Ma
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let wall, stoneWall, skeleton;
let levelBackground;
let tiles;
let tilesHigh, tilesWide;
let tileWidth, tileHeight;
let levelToLoad;
let lines;

function preload() {
  // loading level from txt file 
  levelToLoad = "level/e1m1.txt"
  lines = loadstrings(levelToLoad);

  levelBackground = loadImage("assets/sprites/e1m1_floor.png");

  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
}