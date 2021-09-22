var fondo, fondoimg, ciclista, ciclistaimg;
var distance=0,oppinkimg,opyellowimg,opredimg;
var ciclistaendimg;
var oppinkendimg,opyellowendimg,opredendimg;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameover, gameoverimg,campana;

function preload(){
 fondoimg=loadImage("Road.png");
 ciclistaimg=
loadAnimation("mainPlayer1.png","mainPlayer2.png");
  ciclistaend=loadImage("mainPlayer3.png");
oppinkimg=loadAnimation("opponent1.png","opponent2.png");
oppinkend=loadImage("opponent3.png");
opyellowimg=loadAnimation("opponent4.png","opponent5.png");
opyellowend=loadImage("opponent6.png");
opredimg=loadAnimation("opponent7.png","opponent8.png");
opredend=loadImage("opponent9.png")
gameoverimg=loadImage("gameOver.png");
campana=loadSound("bell.mp3");
  
}

function setup(){
  
createCanvas(1200,300);

  fondo=createSprite(200,150,20,20);
  fondo.addImage(fondoimg);
  
  ciclista=createSprite(100,150,20,20);
  ciclista.addAnimation("SahilRunning", ciclistaimg);
  ciclista.scale=0.06;
//establece el colisionador para el mainCyclist
  ciclista.setCollider("rectangle",0,0,40,40);
  
gameover = createSprite(650,150);
gameover.addImage(gameoverimg);
gameover.scale = 0.8;
gameover.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
    
}

function draw() {
  background(0);
   drawSprites();
 textSize(20);
  fill(255);
  text("Distancia: "+ distance,900,30);
  
if(gameState===PLAY){
 
  distance = distance + Math.round(getFrameRate()/50);
  
   ciclista.y = World.mouseY;
  
   edges= createEdgeSprites();
   ciclista .collide(edges);
  fondo.velocityX = -(6 + 2*distance/150);
  
  if(fondo.x < 0){
  fondo.x=width/2;
}
  if(keyDown("space")) {
    campana.play();
  }
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
      } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
    
  }
     if(pinkCG.isTouching(ciclista)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppinkend);
    }
    
    if(yellowCG.isTouching(ciclista)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",opyellowend);
    }
    
    if(redCG.isTouching(ciclista)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",opredend);
    }
    
  }
  else if (gameState === END) {
    gameover.visible = true;
  
    textSize(20);
    fill(255);
    text("¡Presiona la tecla de Flecha hacia Arriba para reiniciar el juego!", 500,200);
  
    fondo.velocityX = 0;
    ciclista.velocityY = 0;
    ciclista.addAnimation("SahilRunning",ciclistaend);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
}
}


function pinkCyclists(){
  player1 =createSprite(1100,Math.round(random(50, 250)));
  player1.scale =0.06;
  player1.velocityX = -(6 + 2*distance/150);
  player1.addAnimation("opponentPlayer1",oppinkimg);
  player1.setLifetime=170;
  pinkCG.add(player1);
}


function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",opyellowimg);
        player2.setLifetime=170;
       yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",opredimg);
        player3.setLifetime=170;
       redCG.add(player3);
}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  ciclista.addAnimation("SahilRunning",ciclistaimg);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
}




