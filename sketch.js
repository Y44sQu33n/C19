var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png", "ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300);
  ghost.addAnimation("ghost",ghostImg);
  ghost.scale = 0.45;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background(0);

  if(gameState === "play") {

  

  if(tower.y >= 600) {
    tower.y = 300;
  }
  drawSprites();

  if(keyDown("right")) {
    ghost.x = ghost.x + 4;
  }

  if(keyWentDown("space")) {
    ghost.velocityY = -10;
  }

  ghost.velocityY += 0.5;

  if(keyDown("left")) {
    ghost.x = ghost.x - 4;
  }

  spawnDoors();

  if(climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }

  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
    gameState = "end";
  }

  }

  else if(gameState === "end") {
    fill("red")
    textSize(45);
    textFont("Brush Script Mt")
    text("GAME OVER :(",150,300)
    }
}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    door = createSprite(random(150, 500), -80);
    door.addImage("door",doorImg);
    door.velocityY = 1;
    door.lifetime = 700;
    doorsGroup.add(door);

    climber = createSprite(door.x,door.y+60);
    climber.addImage("climber",climberImg);
    climber.velocityY = 1;
    climber.lifetime = 700;
    climbersGroup.add(climber);

    ghost.depth = climber.depth + 1;

    invisibleBlock = createSprite(climber.x,climber.y+15,climber.width,3);
    invisibleBlock.velocityY = 1
    invisibleBlock.lifetime = 700;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.visible = false;
  }
}

