var forestImg,rabbitrun,foxrun,obstacle1,obstacle2,bg,fox,rabbit,stump,spider,obstaclegroup,gamestate,invis,score;
gamestate = 'play'

function preload(){
    forestImg = loadImage("forest.png")
    rabbitrun = loadAnimation("1.png","2.png","3.png")
    foxrun = loadAnimation("fox1.png","fox2.png","fox3.png","fox4.png")
    obstacle1 = loadImage("obstacle.png")
    obstacle2 = loadImage("spider.png")
}

function setup() {
    createCanvas(600, 400);
    score = 0
    console.log(width, height)
    bg = createSprite(200,180,400,20);
    bg.addImage(forestImg);
    bg.x = bg.width/2;
    fox = createSprite(60,340)
    fox.addAnimation('run',foxrun);
    fox.scale = 0.3
    rabbit = createSprite(200,340)
    rabbit.addAnimation('run',rabbitrun);
    rabbit.scale = 0.5
    obstaclegroup = new Group()
    invis = createSprite(300,380,600,20)
    invis.visible = false
    
}

function draw() {
    if (gamestate=='play'){
        bg.velocityX = -3
        if (bg.x < width/2){
            bg.x = bg.width/2;
        }
        if(keyDown("space")&&rabbit.y>=340){
            rabbit.velocityY = -16
        }
        if (obstaclegroup.isTouching(rabbit)){
            gamestate = 'end'
        }
        if (obstaclegroup.isTouching(fox)){
            fox.velocityY = -16
        }
        spawnObstacle() 
        fox.depth = rabbit.depth
        score = score + Math.round(getFrameRate()/60);
        drawSprites()
        fill("white")
        text("Score: "+ score,525,50)
    } else if(gamestate=='end'){
        bg.velocityX = 0
        obstaclegroup.setVelocityXEach(0)
        obstaclegroup.destroyEach()
        fox.destroy()
        rabbit.destroy()
        textSize(20)
        fill("white")
        text("GAME OVER!",260,200)

    }
    rabbit.velocityY = rabbit.velocityY + 0.8
    fox.velocityY = fox.velocityY + 0.8
    rabbit.collide(invis)
    fox.collide(invis)
}

function spawnObstacle() {
    if (frameCount % 150 === 0) {
      var obstacle = createSprite(550,350,10,40);
      var rand = Math.round(random(1,2));
      if (rand==1){
        obstacle.addImage(obstacle1);
        obstacle.scale = 0.2
      } else{
        obstacle.addImage(obstacle2);
        obstacle.scale = 0.075
      }
      obstacle.velocityX = -3
      obstacle.lifetime = 200
      obstacle.depth = rabbit.depth-1
      obstaclegroup.add(obstacle)
    }
  }
  