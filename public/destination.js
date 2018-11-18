
class Destination extends Rectangle {

  constructor(x, y, w){
    super(x, y, w, w);
    this.x = x;
    this.y = y;
    this.w = w;
  }

  show(){
    rect(this.x, this.y, this.w, this.w);
  }

}
