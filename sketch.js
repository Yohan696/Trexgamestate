//introducing the variables 
var trex ,trex_running, ground, ground_running, score, ground_inv, rand_clouds, cloud, cloud_running;
var obstacle, obst1, obst2, obst3, obst4, obst5, obst6, obst7, obst8, obst, randst, clouds_grp, obstacle_grp; 
var PLAY = 1;
var END = 0;
var gamestate = PLAY;

//preloading the graphics of trex for running animation 
function preload(){
  trex_running = loadAnimation ("TRexrun-0p.png", "TRexrun-1p.png", "TRexrun-2p.png", "TRexrun-3p.png", "TRexrun-4p.png", "TRexrun-5p.png", "TRexrun-6p.png", "TRexrun-7p.png", "TRexrun-8p.png", "TRexrun-9p.png");
  ground_running = loadImage ("desert2fin.png");
 // cloud_running = loadImage ("Large-cloud1.png");
  cloud1 = loadImage ("Large-cloud1.png");
  cloud2 = loadImage ("Large-cloud2.png");
  cloud3 = loadImage ("Large-cloud3.png");
  obst1 = loadImage ("Stone1-rmbg.png");
  obst2 = loadImage ("Stone2-rmbg.png");
  obst3 = loadImage ("Stone3-rmbg.png");
  obst4 = loadImage ("Stone4-rmbg.png");
  obst5 = loadImage ("Stone5-rmbg.png");
  obst6 = loadImage ("Stone6-rmbg.png");
  obst7 = loadImage ("Stone7-rmbg.png");
  obst8 = loadImage ("Stone8-rmbg.png");
}

//creating the canvas trex and ground sprites for the setup
function setup() {
  //creating the canvas where trex runs
  createCanvas(900,300)
  score = 0;
  ground_inv = createSprite (500, 280, 15000, 20);
    //creating the ground sprite
  ground = createSprite(500,150,15000,300);
  ground.addImage ("GROUNDMOVING", ground_running);
  ground.scale = 1.2;
  ground_inv.visible = false; 
    //create a trex sprite
    trex = createSprite(70,240, 80, 40);
    //trex animation 
    trex.addAnimation ("TREXMOVING", trex_running);
    //resizing the trex to the canvas
    trex.scale = 0.25;
    obstacle_grp = createGroup();
    clouds_grp = createGroup(); 
  }

function draw(){
//creating yellow background
  background("light blue");
  drawSprites();  
  textSize(30);
  fill("red");
     text("THE T-REX RUNNER GAME!", 260, 35); 
   // text("Press Spacebar to jump...", 200, 90);
   textSize(16);
   text ("Score : "+ score, 780, 30); 
   if (gamestate ==PLAY) {
    score = score + Math.round(frameCount/100);
    ground.velocityX = -8;
    if (ground.x < 230) {
     ground.x = ground.width/2;
    
     //controlling the trex with space key to jump on facing the obstacles
    if (keyDown ("space")) {
      //assigning the Y velocity to the trex on pressing space
      trex.velocityY = -9;
       } 
      //pulling down the trex from the jumping height
    trex.velocityY = trex.velocityY + 0.5;
    //fixing the trex to the ground sprite 
    trex.collide (ground_inv);
       }
       rand_clouds();
       obstacle();
     
       if (obstacle_grp.isTouching(trex)) 
      {
        gamestate = END;
      }
   }
   else if (gamestate == END) {
    ground.velocityX = 0;
   // trex.velocityX = 0;
    clouds_grp.setVelocityXEach (0);
    obstacle_grp.setVelocityXEach (0);
    trex.collide (ground_inv);
    textSize(30);
        fill("red");
        text("GAME OVER!", 380, 145);
       }
    }

function rand_clouds() {
if (frameCount % 70 === 0) {
  cloud = createSprite (890, 60, 60, 20);
  cloud.scale = 0.3;
cloud.velocityX  = -9;
// cloud.addImage ("CLOUDSMOV", cloud_running);
cloud.y = Math.round(random(35,125));
//destroying the clouds after they reach the left side

//adjusting the cloud depth
cloud.depth = trex.depth;
trex.depth = trex.depth + 1;
clouds_grp.add(cloud);
var rand = Math.round(random(1,3));
//adding random images to clouds
if (rand == 1) {
  cloud.addImage ("1st_Cloud", cloud1);}
  else if (rand == 2) {
    cloud.addImage ("2nd_Cloud", cloud2);}
    else  {
      cloud.addImage ("3rd_Cloud", cloud3);} 
      cloud.lifetime = 720;
    }
  } 

function obstacle () {
  if (frameCount % 50 === 0) {
    obst = createSprite (990, 265, 50, 20);
    obst.scale = 0.4;
  obst.velocityX  = -12;
  obst.lifetime = 700; 
  obstacle_grp.add(obst);
 //generating random obstacles on the screen
 var randst = Math.round(random(1,8));
 //adding random images to the obstacles
  switch (randst){
  case 1: obst.addImage ("1st_OBSTACLE", obst1);
          break;
  case 2: obst.addImage ("2nd_OBSTACLE", obst2);
          break;
  case 3: obst.addImage ("3rd_OBSTACLE", obst3);
          break;
  case 4: obst.addImage ("4th_OBSTACLE", obst4);
          break;
  case 5: obst.addImage ("5th_OBSTACLE", obst5);
          break;
  case 6: obst.addImage ("6th_OBSTACLE", obst6);
          break;
  case 7: obst.addImage ("6th_OBSTACLE", obst7);
          break;
  case 8: obst.addImage ("6th_OBSTACLE", obst8);
          break;
  default: break;
        }  
    }
  } 
