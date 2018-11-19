
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
      if(type == 'LOG'){
        var offset = random(0, 400);
        for(let i=0; i<n; i++){
          this.obstacles[i] = new Obstacle(index*grid, offset+spacing*i, grid, length, speed, 'LOG');
        }
      }
    else if(type == 'CAR'){
      var offset = random(0, 400);
      for(let i=0; i<n; i++){
        this.obstacles[i] = new Obstacle(index*grid, offset+spacing*i, grid, length, speed, 'CAR');
      }
    }
    }
  }

  show(){
    if(this.type == 'CAR'){
      fill(64, 70, 79);
      stroke(247, 244, 247, 10);
      rect(this.x, 0, grid, windowHeight);
    }
    else if(this.type == 'LOG'){
      fill(28, 108, 219);
      noStroke();
      rect(this.x, 0, grid, windowHeight);
    }
    else if(this.type == 'GRASS'){
      image(grass, this.x, this.y, this.w, this.h);
    }
    else if(this.type == 'SAFETY'){
      fill(155);
      noStroke();
      rect(this.x, 0, grid, windowHeight);
    }

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
