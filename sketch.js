var trex , trexRun , trexJump;
var gRound , gRoundImg;
var cloud , cloudImg;
var cactus , cactus1Img , cactus2Img , cactus3Img , cactus4Img , cactus5Img , cactus6Img ;
var Tempground;
var cloudGroup , obstacleGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trexDead;
var Score=0;
var gameover , gameOverImg;
var restart , restartImg;
var jumpSound , dieSound , checkPointSound ;


function preload(){
  
  trexRun=loadAnimation("trex1.png","trex3.png","trex4.png");
  
  gRoundImg=loadImage("ground2.png");
  
  cloudImg=loadImage("cloud.png");
  
  trexJump=loadImage("trex1.png");
  
  trexDead=loadImage("trex_collided.png");
  
  cactus1Img=loadImage("obstacle1.png");
  cactus2Img=loadImage("obstacle2.png");
  cactus3Img=loadImage("obstacle3.png");
  cactus4Img=loadImage("obstacle4.png");
  cactus5Img=loadImage("obstacle5.png");
  cactus6Img=loadImage("obstacle6.png");
  
  restartImg=loadImage("restart.png");
  gameoverImg=loadImage("gameover.png");
  
  jumpSound=loadSound("jump.wav");
  dieSound=loadSound("collided.wav");
  checkPointSound=loadSound("checkPoint.mp3");
  
  
}



function setup(){
  
  createCanvas(600,200);
  
  edges=createEdgeSprites();
  
  gRound=createSprite(600,185,1200,3);
  gRound.addImage(gRoundImg);
  
  Tempground=createSprite(600,195,1200,3);
  Tempground.visible=false;
  
  trex=createSprite(50,170,10,41);
  trex.addAnimation("Trex",trexRun);
  trex.addImage("trexj",trexJump);
  trex.addImage("collide",trexDead);
  trex.scale=0.50;
  
  gameover=createSprite(300,100);
  gameover.addImage(gameoverImg);
  gameover.scale=0.7;
  gameover.visible=false;
  
  restart=createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale=0.5;
  restart.visible=false;
  
  score = 0;
   
  cloudGroup = new Group();
  obstacleGroup = new Group(); 
  
}


function draw(){
  
  background(255);
  
  text(Score,550,20);

  if(gameState==PLAY){
      Score=Score + Math.round(getFrameRate()/60);
    if(obstacleGroup.isTouching(trex)){
      gameState=END;
      dieSound.play();
    }
    
    if(keyDown("space") && trex.y>170){
      trex.velocityY=-10;
      jumpSound.play();
    }
  
    trex.velocityY=trex.velocityY + 0.6;
    
  
    if(gRound.x<0){
      gRound.x=gRound.width/2;
    }
  
    if(trex.y<170){
      trex.changeImage("trexj",trexJump);
    }
    
    else{
      trex.changeAnimation("Trex",trexRun);
    }
    
    if(Score%100==0 && Score>0){
      checkPointSound.play();
    }
  
   
    
    gRound.velocityX=-(7+Score/100);
    spawnClouds();
    spawnObs();
    
  }
  
  else if(gameState==END){
    
    
    gRound.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.velocityY=0;
    trex.changeImage("collide",trexDead);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    restart.visible=true;
    gameover.visible=true;
    
  }
  
  trex.collide(Tempground);
  
  if(mousePressedOver(restart)){
      reset();
    }
  
  drawSprites();
  
  
}

function spawnClouds(){
  
  var rand = Math.round(random(50 , 100));
  
  if(frameCount%65==0){
    
    cloud=createSprite(600 , rand);
    cloud.addImage(cloudImg);
    cloud.velocityX=-(3.5+Score/100);
    cloud.scale=0.92
    
    cloud.depth = trex.depth;
    trex.depth ++;
    
    cloud.lifetime=172;
    cloudGroup.add(cloud);
    
  }
}
  
function spawnObs(){

 if(frameCount%60==0){
   
  var cactus = createSprite(600 , 173);
      cactus.velocityX=-(7+Score/100);
      cactus.scale=0.5;
     
  var obs = Math.round(random(1,6));
   
  switch (obs){
     
    case 1 : cactus.addImage(cactus1Img);
    break;  
    case 2 : cactus.addImage(cactus2Img);
    break;
    case 3 : cactus.addImage(cactus3Img);
    break;  
    case 4 : cactus.addImage(cactus4Img);
    break;  
    case 5 : cactus.addImage(cactus5Img);
    break;  
    case 6 : cactus.addImage(cactus6Img);  
    break;
    default : break;
    
    }
    cactus.lifetime=85.5;
    obstacleGroup.add(cactus);
  }
}

function reset(){
  
  gameState=PLAY;
  Score=0;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  gameover.visible=false;
  restart.visible=false;
  
}
