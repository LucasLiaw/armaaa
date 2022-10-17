var gun, blueBall, redBall, backGround, bullet, blast, invisibleGround, restart, gameOver, energy;
var gunImg, blueBallImg, redBallImg, backGroundImg, bulletImg, blastImg, restartImg, gameOverImg, energyImg;
var blueBallGroup, redBallGroup, bulletGroup, energyGroup;
var gameState = 1;
var score = 0;
var life = 3;


function preload(){

gunImg = loadImage("gun1.png");
blueBallImg = loadImage("waterBubble.png");
redBallImg = loadImage("redbubble.png");
backGroundImg = loadImage("back.jpg");
bulletImg = loadImage("bullet1.png");
blastImg = loadImage("blast.png");
restartImg = loadImage("restart.png");
gameOverImg = loadImage("gameOver.png");
energyImg = loadImage("energ.png");

}

function setup(){
createCanvas(800,800);

backGround = createSprite(50,150,50,50);
backGround.addImage("cenario", backGroundImg);

invisibleGround = createSprite(10,800,10,1800);   
invisibleGround.visible = false;

gun = createSprite(100,100,20,20);
gun.addImage("arma", gunImg);
gun.scale = 0.2;

restart = createSprite(400,370);
restart.addImage("reiniciar", restartImg);

gameOver = createSprite(400, 300);
gameOver.addImage("acabou", gameOverImg);

restart.visible = false;
gameOver.visible = false;

blueBallGroup = createGroup();
redBallGroup = createGroup();
bulletGroup = createGroup();
energyGroup = createGroup();

heading= createElement("h1");
scoreboard= createElement("h1");

}

function draw(){
background("#BDA297");

heading.html("Vidas: "+life)
heading.style('color:red'); 
heading.position(150,20)

scoreboard.html("Pontuação: "+score)
scoreboard.style('color:red'); 
scoreboard.position(width-200,20)

if(gameState === 1){

  gun.y = mouseY;

 

  if(frameCount%100 === 0){
    drawRedBall();
  }

  if(frameCount%80 === 0){
    drawBlueBall();
  }

  if(keyDown("space")){
    shootBullet();
  }
  
  
  if(redBallGroup.collide(bulletGroup)){
    redBallcollision();
  }

  if(blueBallGroup.collide(bulletGroup)){
    blueBallcollision();
  }

  if(blueBallGroup.collide(invisibleGround)){
    life = life-1
    blueBallGroup.destroyEach();
  }
 
 if(redBallGroup.collide(invisibleGround)){
   life = life-1
   redBallGroup.destroyEach();
  }
  
 if(energyGroup.isTouching(bulletGroup)){
  bullet.velocityX = bullet.velocityX +20;
  energyGroup.destroyEach();
 }
 
 if(life === 0){
   gameState = 2;
 }
 if(score === 20){
  redBall.velocity.X = redBall.velocityX+20
 }

}
else if(gameState === 2){
   
  restart.visible = true;
  gameOver.visible = true;
  redBallGroup.setVelocityEach(0);
  blueBallGroup.setVelocityEach(0);


  if(mousePressedOver(restart)){
    resetGame();
  }

}
spawnEnergy();
drawSprites(); 


}

function drawBlueBall(){

blueBall = createSprite(400,400);
blueBall.addImage("bolha", blueBallImg);
blueBall.scale = 0.1;
blueBall.velocityX = -9;
blueBallGroup.add(blueBall);

}

function drawRedBall(){

redBall = createSprite(600,600);
redBall.addImage("bolita", redBallImg);
redBall.scale = 0.13;
redBall.velocityX = -15;
redBallGroup.add(redBall);

}

function shootBullet(){

bullet = createSprite(100,100);
bullet.addImage("bala", bulletImg);
bullet.y = gun.y-20
bullet.scale = 0.17;
bullet.velocityX = 10;
bulletGroup.add(bullet);

}


function blueBallcollision(ballGroup){

if(life > 0){
  score = score+1
}

blast = createSprite(bullet.x+60, bullet.y,50,50);
blast.addImage("boom", blastImg);
blast.scale = 0.2;
blast.life=20;
blueBallGroup.destroyEach();
bulletGroup.destroyEach();

}


function redBallcollision(ballGroup){

  if(life > 0){
    score = score+4
  }
  
  blast = createSprite(bullet.x+60, bullet.y,50,50);
  blast.addImage("boom", blastImg);
  blast.scale = 0.2;
  blast.life=20;
  redBallGroup.destroyEach();
  bulletGroup.destroyEach();
  
  }

  function spawnEnergy(){

    if(frameCount%200 ===0){
    energy = createSprite(700,100);
    energy.addImage("energia", energyImg);
    energy.scale = 0.15;
    energy.velocityY = 2
    energyGroup.add(energy);
  }
  if(energyGroup.isTouching(bulletGroup)){
  
    bulletGroup.velocityX = bulletGroup.velocityX +10  
  
  }
  
  }


function resetGame(){

gameState = 1;
restart.visible = false;
gameOver.visible = false;
score = 0;



}

