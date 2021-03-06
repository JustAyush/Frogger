var grid;
var frog = [];
var lane = [];
var weapon = [];
var laneIndexp1
var step = 2, p1Bullet = 10, p2Bullet = 10;
var bulletp1 = [];
var bulletp2 = [];
var destination = [];
var p1Bulletnum, p2Bulletnum, p1info, p2info, winningmsg;
var st1, st2, st3, st4, inv1, inv2, inv3, inv4;
var grass, logWood, tankp1, tankp2, sheepp1, sheepp2;
var bleat, bulletSound, carSound;

function preload(){
  inv1 = loadImage('images/inv1.jpg');
  inv2 = loadImage('images/inv2.jpg');
  inv3 = loadImage('images/inv3.jpg');
  inv4 = loadImage('images/inv4.jpg');
  st1 = loadImage('images/st1.jpg');
  st2 = loadImage('images/st2.jpg');
  st3 = loadImage('images/st3.jpg');
  st4 = loadImage('images/st4.jpg');
  grass = loadImage('images/grass.jpg');
  logWood = loadImage('images/loged.jpg');
  tankp1 = loadImage('images/tankp1.jpg');
  tankp2 = loadImage('images/tankp2.jpg');
  sheepp1 = loadImage('images/sheepp1.png');
  sheepp2 = loadImage('images/sheepp2.png');
  bleat = loadSound('sounds/bleat.mp3');
  bulletSound = loadSound('sounds/bullet.mp3');
  carSound = loadSound('sounds/cardrive.mp3');
}


function setup(){

  socket = io.connect();
  createCanvas(windowWidth, windowHeight);
  background(0);

  grid = Math.floor(0.039 * windowWidth);

  p1Bulletnum = createP('');
  p2Bulletnum = createP('');
  p1Bulletnum.position(0.8*grid, 40);
  p2Bulletnum.position(22*grid, 60);
  p1Bulletnum.style('color', 'white');
  p2Bulletnum.style('color', 'white');

  p1info = createP('');
  p2info = createP('');
  p1info.position(0.8*grid, 10);
  p2info.position(22*grid, 10);
  p1info.style('color', 'white');
  p2info.style('color', 'white');

  winningmsg = select('.winningmsg');

  // lane(index, type, n, length, spacing, speed)
  lane[0] = new Lane(5, 'LOG', 3, 100, 300, Math.floor(random(2, 5)));
  lane[1] = new Lane(6, 'LOG', 3, 100, 300, Math.floor(random(-2, -5)));
  lane[2] = new Lane(7, 'LOG', 3, 100, 300, Math.floor(random(2, 5)));
  lane[3] = new Lane(8, 'LOG', 3, 100, 300, Math.floor(random(-2, -5)));
  //safety Lane(index)
  lane[4] = new Lane(9, 'SAFETY');
  //cars
  lane[5] = new Lane(10, 'CAR', random(0, 3), 100, 300, Math.floor(random(2, 5)));
  lane[6] = new Lane(11, 'CAR', random(0, 3), 100, 150, Math.floor(random(-2, -5)));
  lane[7] = new Lane(12, 'CAR', random(0, 3), 100, 150, Math.floor(random(2, 5)));
  lane[8] = new Lane(13, 'CAR', random(0, 3), 100, 150, Math.floor(random(2, 5)));
  lane[9] = new Lane(14, 'CAR', random(0, 3), 100, 150, Math.floor(random(-2, -5)));
  lane[10] = new Lane(15, 'CAR', random(0, 3), 100, 150, Math.floor(random(-2, -5)));

  lane[11] = new Lane(16, 'SAFETY');

  lane[12] = new Lane(17, 'LOG', 3, 100, 300, Math.floor(random(-2, -5)));
  lane[13] = new Lane(18, 'LOG', 3, 100, 300, Math.floor(random(2, 5)));
  lane[14] = new Lane(19, 'LOG', 3, 100, 300, Math.floor(random(-2, -5)));
  lane[15] = new Lane(20, 'LOG', 3, 100, 300, Math.floor(random(2, 5)));

  for(let i=16; i<19; i++){
    lane[i] = new Lane((i-14), 'GRASS');
  }
  for(let i=19; i<22; i++){
    lane[i] = new Lane((i+2), 'GRASS');
  }


  frog[0] = new Frog(grid, height/2, grid, 'p1');
  frog[1] = new Frog(24*grid, height/2, grid, 'p2');

  weapon[0] = new Weapon(0, height/2, grid+grid*0.2, grid, 'tankp1');
  weapon[1] = new Weapon(25*grid, height/2, grid+grid*0.2, grid, 'tankp2');

  destination[0] = new Destination(grid, height/2, grid, grid*2);
  destination[1] = new Destination(24*grid, height/2, grid, grid*2);
}

function draw(){

  if(ready){
    background(70, 73, 49);

    p1info.html('Player1 Controls: A, S, D, F & space');
    p2info.html('Player2 Controls: ARROW KEYS & ENTER');

    for(let i=0; i<lane.length; i++){
      lane[i].show();
      }

    laneIndexp1 = Math.floor(frog[0].x/grid) - 5;
    if(laneIndexp1 >=0 && laneIndexp1 <= 15){
      lane[laneIndexp1].check(frog[0]);
    }

    laneIndexp2 = Math.floor(frog[1].x/grid) -5;
    if(laneIndexp2 >=0 && laneIndexp2 <= 15){
      lane[laneIndexp2].check(frog[1]);
    }

    for(let i=0; i<destination.length; i++){
      destination[i].show();
    }

    for(let i=0; i<frog.length; i++){
      frog[i].show();
      frog[i].update();
    }

    for(let i=0; i<weapon.length; i++){
      weapon[i].show();
    }
    weapon[0].move();
    weapon[1].moveOpposite();

    for(let i=(bulletp1.length-1); i>=0; i--){
      bulletp1[i].show();
      bulletp1[i].moveLeft();
      if(bulletp1[i].intersects(frog[1])){
        resetGamep2();
        bulletp1.splice(i, 1);
      }
    }

    for(let i=(bulletp2.length-1); i>=0; i--){
      bulletp2[i].show();
      bulletp2[i].moveRight();
      if(bulletp2[i].intersects(frog[0])){
        resetGamep1();
        bulletp2.splice(i, 1);
      }
    }

    if(frog[0].intersects(destination[1])){
      gameover('p1');
    }
    if(frog[1].intersects(destination[0])){
      gameover('p2');
    }
    if(frog[0].intersects(frog[1])){
      resetGamep1();
      resetGamep2();
    }

  }


}


function keyPressed(){
  if(ready){
    if(keyCode == LEFT_ARROW){
      frog[1].move(-1, 0);
    }
    else if(keyCode == RIGHT_ARROW){
      frog[1].move(1, 0);
    }
    else if(keyCode == UP_ARROW){
      frog[1].move(0, -1);
    }
    else if(keyCode == DOWN_ARROW){
      frog[1].move(0, 1);
    }
    else if(key == 'a' || key == 'A'){0
      frog[0].move(-1, 0);
    }
    else if(key == 'd' || key == 'D'){
      frog[0].move(1, 0);
    }
    else if(key == 'w' || key == 'W'){
      frog[0].move(0, -1);
    }
    else if(key == 's' || key == 'S'){
      frog[0].move(0, 1);
    }
    else if(key == ' '){
      if(p1Bullet > 0){
        bulletSound.play();
        var bp1 = new Bullet( grid, (weapon[0].y + 0.5*weapon[0].h), 10);
        bulletp1.push(bp1);
        p1Bullet--;
        p1Bulletnum.html('Bullets remaining : ' + p1Bullet);
      }
    }
    else if(keyCode == ENTER){
      if(p2Bullet > 0){
        bulletSound.play();
        var bp2 = new Bullet( 25*grid, (weapon[1].y + 0.5*weapon[1].h), 10);
        bulletp2.push(bp2);
        p2Bullet--;
        p2Bulletnum.html('Bullets remaining : ' + p2Bullet);
      }
    }
  }

  return false;
}


function resetGamep1(){
  bleat.play();
  frog[0] = new Frog(grid, height/2, grid, 'p1');
}

function resetGamep2(){
  bleat.play();
  frog[1] = new Frog(24*grid, height/2, grid, 'p2');
}


function gameover(p){
  ready = false;

  if(p == 'p1'){
    winningmsg.html("Player 1 won!");
  }
  else if(p == 'p2'){
    winningmsg.html("Player 2 won!");
  }

  toggleModal();
  clear();
  createCanvas(windowWidth, windowHeight);
  background(0);
  frog[0] = new Frog(grid, height/2, grid, 'p1');
  frog[1] = new Frog(24*grid, height/2, grid, 'p2');
  p1Bullet = 10;
  p2Bullet = 10;
  bulletp1.splice(0, bulletp1.length);
  bulletp2.splice(0, bulletp2.length);
  p1Bulletnum.html('');
  p2Bulletnum.html('');
  p1info.html('');
  p2info.html('');
}

setInterval(function(){
  if(ready)
    carSound.play();
}, 15000);
