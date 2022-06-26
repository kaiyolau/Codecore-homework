class Turtle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.trackPoints = [[this.x, this.y]];
  }


  forward(steps) {
    this.setCorrectAngle();
    for (let i = 0; i < steps; i++) {
      switch (this.angle) {
        case 0:
          this.x += 1;
          break;
        case 90:
          this.y += 1;
          break;
        case 180:
          this.x -= 1;
          break;
        case 270:
          this.y -= 1;
          break;
      }
      this.trackPoints.push([this.x, this.y]);
    }
    return this;
  }

  //make sure angel is between 0 - 360
  setCorrectAngle() {
    if (this.angle >= 360) {
      this.angle = this.angle % 360;
    }
    if (this.angle < 0) {
      this.angle += 360;
    }
  }

  right() {
    this.angle += 90;
    return this;
  }

  left() {
    this.angle -= 90;
    return this;
  }

  allPoints() {
    return this.trackPoints;
  }

  isTrackPoint(x, y) { //input x,y, output true/ false 
    return this.allPoints().some((p) => p[0] === x && p[1] === y);
  } 

  calBorder() {
    let minX = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = Number.MIN_VALUE;
    for (let point of this.trackPoints) {
      const currentX = point[0];
      const currentY = point[1];
      minX = Math.min(currentX, minX);
      maxX = Math.max(currentX, maxX);
      minY = Math.min(currentY, minY);
      maxY = Math.max(currentY, maxY);
    }
    return {minX, maxX, minY, maxY};
  } 



  print() {
    const { minX, maxX, minY, maxY } = this.calBorder(); //adding the MAX row(13) & max col(9) to 
    let string = "";
    for (let i = minY; i <= maxY; i++) { //horitonal 0,1,2,3,4,5,6,7,8,9,10,11,12,13
      for (let j = minX; j <= maxX; j++) {  //vertical 0,1,2,3,4,5,6,7,8,9
        string += this.isTrackPoint(j, i) ? "■ " : "□ ";
      }
      string += "\n";
    }
    console.log(string);
    return this;
  }
}


new Turtle(0, 4)
  .forward(3)
  .left()
  .forward(3)
  .right()
  .forward(5)
  .right()
  .forward(8)
  .right()
  .forward(5)
  .right()
  .forward(3)
  .left()
  .forward(3)
  .print();