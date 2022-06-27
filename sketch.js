var gameState = "play";
var ninjaGirl;
var ninjaGirlImg,ninjaGirlParadaEsquerdaImg;
var backgroundImg;
var ninjaGirlCorrendoDireita;
var ninjaGirlCorrendoEsquerda;
var ninjaGirlAtacandoDireita;
var pos = "direita";
var invisibleGround;
var ninjaGirlJumpDireita;
var ninjaGirlJumpEsquerda;
var ninjaGirlMorrendoD;
var girlMorta, girlMortaImg;
var adaga;
var adagaImg;
var contA;
var contB;
var contC;
var contImg;
var contAdaga = 3;
var contaAdaga;
var adagaE;
var vida = 50;
var vidab = vida;
var placar;
var placarImg;
var seta, setaImg;
var dano;
var morreuImg;
var morreu;
var contImg;
var vidaPlacar;
var vidaPlacarR;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
// colocar "Body"
const body = Matter.Body;

function preload()
{
  ninjaGirlImg = loadImage("./Sprites/girlparada.gif");
  backgroundImg = loadImage("./Sprites/background2.gif");
  ninjaGirlCorrendoEsquerda = loadImage("./Sprites/girlcorrendoesquerda.gif");
  ninjaGirlCorrendoDireita = loadImage("./Sprites/girlcorrendodireita.gif");
  ninjaGirlParadaEsquerdaImg = loadImage("./Sprites/girlparadaesquerda.gif");
  ninjaGirlAtacandoDireita = loadImage("./Sprites/girlatacandodireita.gif");
  ninjaGirlJumpDireita = loadImage("./Sprites/Jump.png");
  ninjaGirlJumpEsquerda = loadImage("./Sprites/JumpE.png");
  adagaImg = loadImage("./Sprites/Kunai.png");
  placarImg = loadImage("./Sprites/Placar.png");
  ninjaGirlMorrendoD = loadImage("./Sprites/girlmorrendodireita.png");
  setaImg = loadImage("./Sprites/seta.png");
  girlMortaImg = loadImage("./Sprites/girlmorta.png");
  morreuImg = loadImage("./Sprites/morreu.png");
  contImg = loadImage("./Sprites/cont.png");

  

  ninjaGirlMorrendoD.looping= false;
  
}

function setup() {
	createCanvas(windowWidth, windowHeight);


	engine = Engine.create();
	world = engine.world;

	//Crie os Corpos aqui.

	ninjaGirl = createSprite(windowWidth/5, windowHeight/2,20,20);
	ninjaGirl.addImage(ninjaGirlImg);
	ninjaGirl.scale = 0.5;
  ninjaGirl.depth = 2;
  //trex.depth = trex.depth+1;

	World.add(world, ninjaGirl);

  morreu = createSprite(windowWidth/2, windowHeight/2,20,20);
  morreu.addImage(morreuImg);
  morreu.depth = 10;

	invisibleGround = createSprite(width/2,height-10,width,125);
	invisibleGround.visible = false;

  contaAdaga = createSprite(100,240,10,10);
  contaAdaga.visible = false;

  placar = createSprite(349,80,20,20);
  placar.addImage(placarImg);
  placar.scale = 0.8;
  placar.depth = 2;

  girlMorta = createSprite(ninjaGirl.x,ninjaGirl.y,10,10);

  seta = createSprite(ninjaGirl.x, ninjaGirl.y - 20,10,10);
  seta.depth = 1;

  vidaPlacar = createSprite(313,64,500,65);
  vidaPlacar.shapeColor = "green";

  vidaPlacarR = createSprite(434,64,500,65);
  vidaPlacarR.shapeColor = "red";
  vidaPlacarR.depth = 0;

  contA = createSprite(210,114,10,10);
  contA.addImage(contImg);

  contB = createSprite(247,114,10,10);
  contB.addImage(contImg);

  contC = createSprite(284,114,10,10);
  contC.addImage(contImg);

  dano = createSprite(800,600,80,80);


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(backgroundImg);
  ninjaGirl.velocityY += 1.85;
  ninjaGirl.collide(invisibleGround);

  drawSprites();


  if(vida <= 0){
    gameState = "end";
  }
  if(gameState == "end"){
    placar.visible = false;
    ninjaGirl.addImage(ninjaGirlMorrendoD);
    girlMorta.addImage(girlMortaImg);
    girlMorta.scale = 0.1;
    girlMorta.velocityY = -7;
    girlMorta.x = ninjaGirl.x;
    morreu.visible = true;
    vidaPlacar.visible = false;
    vidaPlacarR.visible = false;
  }











  // estado do jogo é PLAY

  if(gameState == "play"){
  
  seta.x = ninjaGirl.x
  seta.y = ninjaGirl.y - 150;
  seta.addImage(setaImg);
  seta.scale = 0.3;
  girlMorta.visible = false;



  if(ninjaGirl.collide(dano)){
    vida = vida -1;
  }
  if(contAdaga > 2){
    contC.visible = true;
  }
  else{
    contC.visible = false;
  }
  if(contAdaga > 1){
    contB.visible = true;
  }
  else{
    contB.visible = false;
  }
  if(contAdaga > 0){
    contA.visible = true;
  }
  else{
    contA.visible = false;
  }
  if(contAdaga < 3){
  
    contaAdaga.velocityX = 1;
  }
  else{
    contaAdaga.velocityX = 0;
  }
  if(contaAdaga.x > 300){
    contAdaga++;
    contaAdaga.x = 100;
  }
  if(keyDown("w") && ninjaGirl.y >= height/1.4){
	ninjaGirl.velocityY = -30;
  }
  
  if(ninjaGirl.y <= height/1.4 && pos != "esquerda"){
    ninjaGirl.addImage(ninjaGirlJumpDireita);
  }
  if(ninjaGirl.y <= height/1.4 && pos != "direita"){
    ninjaGirl.addImage(ninjaGirlJumpEsquerda);
  }

  if(keyDown("A")){
    ninjaGirl.position.x = ninjaGirl.position.x -10;
	  pos = "esquerda";
  if(ninjaGirl.y > height/1.4){
    ninjaGirl.addImage(ninjaGirlCorrendoEsquerda); 
  }
  }
  if(keyDown("D") && pos != "ataque"){
    ninjaGirl.position.x = ninjaGirl.position.x +10;
    pos = "direita";
    if(ninjaGirl.y > height/1.4){
      ninjaGirl.addImage(ninjaGirlCorrendoDireita); 
    }
  }
  if(keyDown("O")){
	ninjaGirl.addImage(ninjaGirlAtacandoDireita);
  }
  if(keyDown("P") && contAdaga > 0 && pos == "direita"){
    createAdagaD();
    contAdaga --;
    }
    if(keyDown("P") && contAdaga > 0 && pos == "esquerda"){
      createAdagaE();
      contAdaga --;
      }
  if(!keyDown("D") && !keyDown("A") &&  !keyDown("O") && !keyDown("W") && ninjaGirl.y > height/1.4 && pos == "direita" && vida > 0){
	ninjaGirl.addImage(ninjaGirlImg);
  }
  if(!keyDown("D") && !keyDown("A") &&  !keyDown("O") && !keyDown("W") && ninjaGirl.y > height/1.4 && pos == "esquerda" && vida > 0){
    ninjaGirl.addImage(ninjaGirlParadaEsquerdaImg);;
}
  morreu.visible = false;
  vidaPlacar.position.x = vida*10 - 68;
  vidaPlacar.depth = 1;
  }
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight); 
}
function createAdagaD () {
  adaga = createSprite(100,100,50,50);
  adaga.addImage(adagaImg);
  adaga.velocityX = 17;
  adaga.x = ninjaGirl.x;
  adaga.y = ninjaGirl.y;
  adaga.lifetime = 100;
}
function createAdagaE () {
  adagaE = createSprite(100,100,50,50);
  adagaE.addImage(adagaImg);
  adagaE.velocityX = -17;
  adagaE.x = ninjaGirl.x;
  adagaE.y = ninjaGirl.y;
  adagaE.lifetime = 100;
  adagaE.rotation = 180;
}
