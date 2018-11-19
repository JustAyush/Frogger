
class Obstacle extends Rectangle {

  constructor(x, y, w, h, speed, type){
    super(x, y, w, h);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.type = type;
    this.inv = Math.floor(random(1,4));
    this.st = Math.floor(random(1,4));
  }

  show(){
    if(this.type == 'CAR'){
      if(this.speed > 0){
        if(this.inv == 1)
          image(inv1, this.x, this.y, this.w, this.h);
        else if(this.inv == 2)
          image(inv2, this.x, this.y, this.w, this.h);
        else if(this.inv == 3)
          image(inv3, this.x, this.y, this.w, this.h);
        else if(this.inv == 4)
          image(inv4, this.x, this.y, this.w, this.h);
        }
      else{
        if(this.st == 1)
          image(st1, this.x, this.y, this.w, this.h);
        else if(this.st == 2)
          image(st2, this.x, this.y, this.w, this.h);
        else if(this.st == 3)
          image(st3, this.x, this.y, this.w, this.h);
        else if(this.st == 4)
          image(st4, this.x, this.y, this.w, this.h);
      }
    }
    else if(this.type == 'LOG')
      image(logWood, this.x, this.y, this.w, this.h);
  }

  move(){
    this.y += this.speed;
    if(this.speed > 0 && this.y > windowHeight+grid)
      this.y = -this.w - grid - random(10, 50);
    else if(this.speed<0 && this.y < -this.h-grid)
      this.y = windowHeight + grid + random(10, 50);
  }

}
