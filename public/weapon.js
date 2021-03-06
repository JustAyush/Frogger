
class Weapon extends Rectangle {

  constructor(x, y, w, h, type){
    super(x, y, w, h);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
  }

  show(){
    if(this.type == 'tankp1')
      image(tankp1, this.x, this.y, this.w, this.h);
    else if(this.type == 'tankp2')
      image(tankp2, this.x, this.y, this.w, this.h);
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
