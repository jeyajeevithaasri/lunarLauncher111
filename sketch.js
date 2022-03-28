let ground;
let lander;
var lander_img;
var coin_img;
var bg_img;
var invisible_ground;
var coin;
var coin2;
var coin_grp;
var score = 0;


var vy = 0;
var g = 0.05;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  coin_img = loadAnimation("coin.png");
 

}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

  lander = createSprite(300,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.setCollider("rectangle",0,0,200,200);

  invisible_ground = createSprite(500,600,1000,45);
  invisible_ground.visible = false ;

  coin_grp = new Group();




  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Vertical Velocity: "+round(vy),800,75);
  pop();

  //fall down
  vy +=g;
  lander.position.y+=vy;

  lander.collide(invisible_ground);

  textSize(30)
  text("score:"+score,800,105);


  if (frameCount%80===0){
    coin = createSprite(random(30,650)
    ,random(100,350),20,20);
    coin.addAnimation("coinAnimate",coin_img);
    coin_grp.add(coin);
    coin.scale = 0.015;
    coin.lifetime = 120;

  }


  if (frameCount%720===0){
  coin.destroy

  }

  if (coin_grp.isTouching(lander)){
   score = score+4;
   console.log(score);
   coin_grp.destroyEach();
   
  }

  if (lander.y>600){
   
    textSize(50);
    text("Game Over",500,350);
    lander.destroy();
    coin_grp.destroy();
    background(0);

  }

  drawSprites();
}

function keyPressed()
{
  if(keyCode==UP_ARROW)
  {
    upward_thrust();
    lander.changeAnimation('thrusting');
   // thrust.nextFrame();
    
  }
  if(keyCode==LEFT_ARROW){
  lander.x=lander.x-20; 
  }

  if(keyCode==RIGHT_ARROW){
    lander.x=lander.x+20; 
    }
}

function upward_thrust()
{
  vy = -2;
}

