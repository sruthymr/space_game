var gameState = "play"
var space, spaceImg ;
var rocket, rocketImg;
var rock, rockImg, rocksGroup;
var star, starImg, starsGroup;
var score;


function preload(){
 spaceImg = loadImage("space.jpg");
 rocketImg = loadImage("rocket.png");
 rockImg = loadImage("rock.png");
 starImg = loadImage("star.png"); 
}


function setup() {
 createCanvas(400, 500);

  space = createSprite(200,200);
  space.addImage("space",spaceImg);
  space.velocityY = 4;
  space.scale = 0.7;
  
  rocket = createSprite(200,420,20,50);
  rocket.addImage("rocket",rocketImg);
  rocket.scale = 0.2;
  
  rocksGroup = new Group();
  starsGroup = new Group();
  
  score = 0;
  
  rocket.setCollider("rectangle",0,0,250,rocket.height);
  rocket.debug = false;
}

function draw() {
  background(30);
   text("Score: "+ score, 200,200); 
  
if(gameState === "play"){
  
   if(space.y > 400){
    space.y = 200;
  }
  
 if(keyDown("left_arrow")){
     rocket.x = rocket.x - 5;
    }
      if(keyDown("right_arrow")){
      rocket.x = rocket.x +5;
    } 
 
  score = score + Math.round(getFrameRate()/100);
  
  if(starsGroup.isTouching(rocket)){
    score = score + 50;
  }
 
  spawnStars(); 
  spawnRocks();
}
  if(rocksGroup.isTouching(rocket)){
  gameState = "end";
  }
  
  if(gameState === "end"){
    space.velocityY = 0;
    rocksGroup.setVelocityYEach(0);
    starsGroup.setVelocityYEach(0);
 
    if(keyDown("space")){
       reset();
     }
  }

drawSprites();
   if(gameState === "end"){
  stroke("red");
  fill("white");
  textSize(40);
  text("game over",140 , 250 );
 
}
  
}

function spawnRocks(){
  rock = createSprite(-50,-50);
  rock.addImage("rock",rockImg);
  rock.scale = 0.1;
  if(frameCount % 200 === 0 ){
    rock.x=Math.round(random(100, 350));
    rock.velocityY = 6;
    rock.lifetime = 800;
   }
  rocksGroup.add(rock);
}
  
  function spawnStars(){
  star = createSprite(-50,-50);
  star.addImage("star",starImg);
  star.scale = 0.05;
  if(frameCount % 200 === 0 ){
    star.x=Math.round(random(100, 350));
    star.velocityY = 3;
    star.lifetime = 800;
   }
  starsGroup.add(star);
  }
  
  function reset(){
 
  gameState = "play";
  starsGroup.destroyEach();
  rocksGroup.destroyEach();
  score = 0;
  space.addAnimation("space",spaceImg);
}

  
  
  
  
  
  
  
  






















