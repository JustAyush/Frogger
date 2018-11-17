
class Rectangle{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  intersects(other){
    var left = this.x;
    var right = this.x + this.w;
    var top = this.y;
    var bottom = this.y + this.h;

    var oleft = other.x;
    var oright = other.x + other.w;
    var otop = other.y;
    var obottom = other.y + other.h;

    return !(left >= oright || right <= oleft || top >= obottom || bottom <= otop);

  }

}
