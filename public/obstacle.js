
class Obstacle extends Rectangle {

  constructor(x, y, w, h, speed){
    super(x, y, w, h);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
  }

  show(){
    fill(0, 0, 255);
    rect(this.x, this.y, this.w, this.h);
  }

  move(){
    this.y += this.speed;
    if(this.speed > 0 && this.y > windowHeight+grid)
      this.y = -this.w - grid - random(10, 50);
    else if(this.speed<0 && this.y < -this.h-grid)
      this.y = windowHeight + grid + random(10, 50);
  }

}
