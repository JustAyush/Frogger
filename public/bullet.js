
class Bullet extends Rectangle {

  constructor(x, y, r){
    super(x, y, r, r);
    this.x = x;
    this.y = y;
    this.r = r;
    this.toDelete = false;
  }

  show(){
    ellipse(this.x, this.y, this.r, this.r);
  }

  moveLeft(){
    this.x += 4;
  }

  moveRight(){
    this.x -= 4;
  }

  deleteBullet(){
    this.toDelete = true;
  }


}
