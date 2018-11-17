class Frog extends Rectangle {
  constructor(x, y, w, p){
    super(x, y, w, w);
    this.x = x;
    this.y = y;
    this.w = w;
    this.p = p;
    this.sitting_on = null;
  }

  show(){
    rect(this.x, this.y, this.w, this.w);
  }

  move(xdir, ydir){
    this.x += xdir * grid;
    this.y += ydir * grid;
    this.x = constrain(this.x, 0, (width-grid));
    this.y = constrain(this.y, 0, (height-grid));
    this.sitting_on = null;
  }

  attach(other){
    this.sitting_on = other;
  }

  update(){
    if(this.sitting_on != null){
      this.y += this.sitting_on.speed;
    }
    this.y = constrain(this.y, 0, (height-grid));
  }

}
