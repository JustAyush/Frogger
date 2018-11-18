
class Weapon extends Rectangle {

  constructor(x, y, w, h){
    super(x, y, w, h);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show(){
    rect(this.x, this.y, this.w, this.h);
  }

  move(){
    this.y += step;
    if((this.y+this.h) > windowHeight || this.y < 0)
      step *= -1;
  }

  moveOpposite(){
    this.y -= step;
    if((this.y+this.h) > windowHeight || this.y < 0)
      step *= -1;
  }

}
