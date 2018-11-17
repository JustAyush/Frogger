var grid;
var frog = [];
var lane = [];
var laneIndexp1;


function setup(){

  socket = io.connect();
  createCanvas(windowWidth, windowHeight);

  grid = Math.floor(0.039 * windowWidth);

  // lane(index, type, n, length, spacing, speed)
  lane[0] = new Lane(5, 'LOG', 3, 100, 150, 2);
  lane[1] = new Lane(6, 'LOG', 3, 100, 150, -2);
  lane[2] = new Lane(7, 'LOG', 3, 100, 150, 2);
  lane[3] = new Lane(8, 'LOG', 3, 100, 150, -2);
  //safety Lane(index)
  lane[4] = new Lane(9, 'SAFETY');
  //cars
  lane[5] = new Lane(10, 'CAR', 3, 50, 150, 5);
  lane[6] = new Lane(11, 'CAR', 3, 50, 150, -5);
  lane[7] = new Lane(12, 'CAR', 3, 50, 150, 5);
  lane[8] = new Lane(13, 'CAR', 3, 50, 150, 5);
  lane[9] = new Lane(14, 'CAR', 3, 50, 150, -5);
  lane[10] = new Lane(15, 'CAR', 3, 50, 150, -5);

  lane[11] = new Lane(16, 'SAFETY');

  lane[12] = new Lane(17, 'LOG', 3, 100, 150, -2);
  lane[13] = new Lane(18, 'LOG', 3, 100, 150, 2);
  lane[14] = new Lane(19, 'LOG', 3, 100, 150, -2);
  lane[15] = new Lane(20, 'LOG', 3, 100, 150, 2);

  frog[0] = new Frog(grid, height/2, grid, 'p1');
  frog[1] = new Frog(24*grid, height/2, grid, 'p2');
}

function draw(){
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


    // if(Math.floor(frog[1].x/lane[i].x)){
    //   lane[i].checkCar(frog[1]);
    //   lane[i].checkLog(frog[1]);
    // }
    // if(Math.floor(frog[0].x/lane[i].x)){
    //   lane[i].checkCar(frog[0]);
    //   lane[i].checkLog(frog[0]);
    // }



  for(let i=0; i<frog.length; i++){
    frog[i].show();
    frog[i].update();
  }

}


function keyPressed(){
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

  return false;
}


function resetGamep1(){
  frog[0] = new Frog(grid, height/2, grid, 'p1');
}

function resetGamep2(){
  frog[1] = new Frog(24*grid, height/2, grid, 'p2');
}
