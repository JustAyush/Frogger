
class Destination extends Rectangle {

  constructor(x, y, w, h){
    super(x, y, w, h);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show(){
    image(grass, this.x, this.y, this.w, this.h);
  }

}
