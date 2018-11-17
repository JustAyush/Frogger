
class Lane extends Rectangle{

  constructor(index, type, n, length, spacing, speed){
    super(index * grid, 0, width, grid);
    this.x = index * grid;
    this.y = 0;
    this.w = grid;
    this.h = windowHeight;
    this.type = type;
    this.obstacles = [];
    if(type != 'SAFETY'){
      var offset = random(0, 400);
      for(let i=0; i<n; i++){
        this.obstacles[i] = new Obstacle(index*grid, offset+spacing*i, grid, length, speed);
      }
    }
  }

  show(){
    fill(255);
    if(this.type == 'SAFETY')
      fill(155);
    rect(this.x, 0, grid, windowHeight);
    for(let i=0; i<this.obstacles.length; i++){
        this.obstacles[i].show();
        this.obstacles[i].move();
    }
  }

  check(frog){
    if(this.type == 'CAR'){
      for(let i=0; i<this.obstacles.length; i++){
          if(frog.intersects(this.obstacles[i])){
            if(frog.p == 'p1')
              resetGamep1();
            else if(frog.p == 'p2')
              resetGamep2();
          }
      }
    }
    else if(this.type == 'LOG'){
      var ok = false;
       for(let i=0; i<this.obstacles.length; i++){
        if (frog.intersects(this.obstacles[i])) {
          ok = true;
          frog.attach(this.obstacles[i]);
        }
      }
      if (!ok) {
        if(frog.p == 'p1')
          resetGamep1();
        else if(frog.p == 'p2')
          resetGamep2();
      }
    }
  }


}
