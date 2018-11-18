var grid;
var frog = [];
var lane = [];
var weapon = [];
var laneIndexp1
var step = 2, p1Bullet = 10, p2Bullet = 10;
var bulletp1 = [];
var bulletp2 = [];
var destination = [];
var p1Bulletnum, p2Bulletnum;


function setup(){

  socket = io.connect();
  createCanvas(windowWidth, windowHeight);
  background(0);

  grid = Math.floor(0.039 * windowWidth);

  p1Bulletnum = createP('');
  p2Bulletnum = createP('');
  p1Bulletnum.position(0.8*grid, 10);
  p2Bulletnum.position(22*grid, 10);
  p1Bulletnum.style('color', 'white');
  p2Bulletnum.style('color', 'white');



  // lane(index, type, n, length, spacing, speed)
  lane[0] = new Lane(5, 'LOG', 3, 100, 150, 2);
  lane[1] = new Lane(6, 'LOG', 3, 100, 150, -2);
  lane[2] = new Lane(7, 'LOG', 3, 100, 150, 2);
  lane[3] = new Lane(8, 'LOG', 3, 100, 150, -2);
  //safety Lane(index)
  lane[4] = new Lane(9, 'SAFETY');
  //cars
  lane[5] = new Lane(10, 'CAR', 3, 50, 150, 2);
  lane[6] = new Lane(11, 'CAR', 3, 50, 150, -2);
  lane[7] = new Lane(12, 'CAR', 3, 50, 150, 2);
  lane[8] = new Lane(13, 'CAR', 3, 50, 150, 2);
  lane[9] = new Lane(14, 'CAR', 3, 50, 150, -2);
  lane[10] = new Lane(15, 'CAR', 3, 50, 150, -2);

  lane[11] = new Lane(16, 'SAFETY');

  lane[12] = new Lane(17, 'LOG', 3, 100, 150, -2);
  lane[13] = new Lane(18, 'LOG', 3, 100, 150, 2);
  lane[14] = new Lane(19, 'LOG', 3, 100, 150, -2);
  lane[15] = new Lane(20, 'LOG', 3, 100, 150, 2);

  frog[0] = new Frog(grid, height/2, grid, 'p1');
  frog[1] = new Frog(24*grid, height/2, grid, 'p2');

  weapon[0] = new Weapon(0, height/2, grid, grid*2);
  weapon[1] = new Weapon(25*grid, height/2, grid, grid*2);

  destination[0] = new Destination(grid, height/2, grid, grid*2);
  destination[1] = new Destination(24*grid, height/2, grid, grid*2);
}

function draw(){

  if(ready){
    background(0);

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

    for(let i=0; i<destination.length; i++){
      destination[i].show();
    }

    if(frog[0].intersects(destination[1])){
      gameover();
    }
    if(frog[1].intersects(destination[0])){
      gameover();
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
      frog[0].move(-1, 0);
    }
    else if(keyCode == RIGHT_ARROW){
      frog[0].move(1, 0);
    }
    else if(keyCode == UP_ARROW){
      frog[0].move(0, -1);
    }
    else if(keyCode == DOWN_ARROW){
      frog[0].move(0, 1);
    }
    else if(key == 'a' || key == 'A'){0
      frog[1].move(-1, 0);
    }
    else if(key == 'd' || key == 'D'){
      frog[1].move(1, 0);
    }
    else if(key == 'w' || key == 'W'){
      frog[1].move(0, -1);
    }
    else if(key == 's' || key == 'S'){
      frog[1].move(0, 1);
    }
    else if(key == ' '){
      if(p1Bullet > 0){
        var bp1 = new Bullet( grid, (weapon[0].y + 0.5*weapon[0].h), 10);
        bulletp1.push(bp1);
        p1Bullet--;
        p1Bulletnum.html('Player 1 <br>' + 'Bullets remaining : ' + p1Bullet);
      }
    }
    else if(keyCode == ENTER){
      if(p2Bullet > 0){
        var bp2 = new Bullet( 25*grid, (weapon[1].y + 0.5*weapon[1].h), 10);
        bulletp2.push(bp2);
        p2Bullet--;
        p2Bulletnum.html('Player 2 <br>' + 'Bullets remaining : ' + p2Bullet);
      }
    }
  }

  return false;
}


function resetGamep1(){
  frog[0] = new Frog(grid, height/2, grid, 'p1');
}

function resetGamep2(){
  frog[1] = new Frog(24*grid, height/2, grid, 'p2');
}


function gameover(){
  ready = false;
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
}
