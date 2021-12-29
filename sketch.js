//=========================== ZOMBIE GAME ===========================\\
//declaring variables,

//background variable and image
var bg , bgImg;

//player variable and 2 images for the player
var player, playerImg, player_ShootingImg;

//declaring the hearts and thier images
var heart1, heart1_img;

var heart2, heart2_img;

var heart3, heart3_img;

//declaring the zombie variable
var zombie, zombieImg, zombieGroup;

//declaring the bullets and the bullet and the bullet group
var bullets = 50;

var bulletGroup, bullet;

var gameState = "fight";

//============ PRELOAD FUNCTION ============\\
function preload(){
  //loading all the images;
  bgImg = loadImage("assets/bg1.png");
  playerImg = loadImage("assets/shooter_2.png");
  player_ShootingImg = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie1.png");
  heart1_img = loadImage("assets/heart_1.png");
  heart2_img = loadImage("assets/heart_2.png");
  heart3_img = loadImage("assets/heart_3.png");
}

//============ SETUP FUNCTION ============\\
function setup(){
  //making all sprites
  var canvas = createCanvas(1300,600);

  bg = createSprite(width/2, height/2.5, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 1.5;

  player = createSprite(200, 500,30,30);
  player.addImage(playerImg);
  player.scale = 0.4;
  player.debug = true;
  player.setCollider("rectangle", 0, 0, 300, 500);

  heart1 = createSprite(1120, 50, 20, 20);
  heart1.addImage(heart1_img);
  heart1.scale = 0.2;
  
  heart2 = createSprite(1140, 50, 20, 20);
  heart2.addImage(heart2_img);
  heart2.scale = 0.2;
  
  heart3 = createSprite(1160, 50, 20, 20);
  heart3.addImage(heart3_img);
  heart3.scale = 0.2;

  bulletGroup = new Group();
  zombieGroup = new Group();

}

//============ DRAW FUNCTION ============\\
function draw(){
  //adding background
  background(9);

  if(gameState === "fight"){

    //Moving player
    if(keyDown("UP_ARROW") || touches.length > 0 && player.position.y != 300){
      player.position.y -= 3;  
    }

    if(keyDown("DOWN_ARROW")  || touches.length > 0){
      player.position.y += 3;
    }

    if(keyDown("RIGHT_ARROW")){
      player.position.x += 3; 
    }
    
    if(keyDown("LEFT_ARROW")){
      player.position.x -= 3;
    }
    
    // If space Bar is down the player image changes to shooting image
    if(keyWentDown("space")){    
      player.addImage(player_ShootingImg)
      bullet = createSprite(player.position.x + 80, player.position.y - 30, 20, 10);
      bullet.velocity.x = 20;
      bulletGroup.add(bullet);
      player.depth = bullet.depth;
      player.depth = player.depth + 2;
      bullets -= 1;
      bullet.shapeColor = "red";    
    }

    // else changes to normal image
    else if(keyWentUp("space")){
      player.addImage(playerImg);
    }

    if(bullets==0){
      gameState="bullet";
    }

    if(zombieGroup.isTouching(player)){
      for(var i=0;i<zombieGroup.length;i++){      
        if(zombieGroup[i].isTouching(player)){
          zombieGroup[i].destroy()
          //player.destroy()
        } 
      }
    }

    if(zombieGroup.isTouching(bulletGroup)){
      for(var i=0;i<zombieGroup.length;i++){      
        if(zombieGroup[i].isTouching(bulletGroup)){
          zombieGroup[i].destroy()
          bulletGroup.destroyEach();
        } 
      }
    }

    //calling enemy function
    enemy();
  }

  // Drawing all the sprites
  drawSprites();

  if(gameState=='lost'){
    textSize(30);
    fill("red")
    text("YOU LOST THE GAME....!", width/2, height/2);
    player.destroy();
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();    
  }

  else if(gameState=='won'){
    textSize(35);
    fill("green");
    text("YOU WON THE GAME", width/2, height/2);
    player.destroy();
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();
  }

  else if(gameState=="bullet"){
    textSize(30);
    fill("red")
    text("YOU RAN OUT OF BULLETS....!", width/2, height/2);
    player.destroy();
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();
  }
}

//=========== ENEMY FUNCTION ============\\
function enemy(){
  if(frameCount % 50 === 0){
    zombie = createSprite(random(1200, 1500), random(350, 500), 50, 50);
    zombie.addImage(zombieImg);
    zombie.velocity.x = -10;
    zombie.scale = 0.3;
    //console.log(zombie.position.y);

    zombie.lifetime = 400;

    zombieGroup.add(zombie);

    //console.log(zombie.position.x);
  }
}
