//Note for myself: Usually we use (r,c) to represent a point for leetcode question
//so a point(0,4) means at row 0, column 4
//example: 
//□□□■

//In this problem, it use (x, y) to represent a point
//a point (0,4) means at x-axis 0, y-axis 4
//example:
//□
//□
//□
//■

//this represent east, south, west, north;
const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];


class Turtle {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.movement = [[x, y]];
        this.direction = 0;
    }

    forward(steps) {
        const movedirections = directions[this.direction];
        for (let i = 1; i <= steps; i++) {
            this.x += movedirections[0] * 1;
            this.y += movedirections[1] * 1;
            this.movement.push([this.x, this.y]);
        }
        return this;
    }

    right() {
        this.direction += 1;
        //reset to 0
        if (this.direction > 3) {
            this.direction = 0;
        }
        return this;
    }

    left() {
        this.direction -= 1;
        //reset to 3
        if (this.direction < 0) {
            this.direction = 3;
        }
        return this;
    }

    allPoints() {
        return this.movement;
    }

    print() {
        let res = "";
        let minX = Number.MAX_VALUE, minY = Number.MAX_VALUE;
        let maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE;

        const checkVisit = (x, y) => {
            for (let position of this.movement) {
                if (position[0] == x && position[1] == y) {
                    return true;
                }
            }
            return false;
        }

        for (let point of this.movement) {
            minX = Math.min(0, minX, point[0]);
            minY = Math.min(0, minY, point[1]);
            maxX = Math.max(maxX, point[0]);
            maxY = Math.max(maxY, point[1]);
        }
        // let min = Math.min(0, minX, minY);
        // let max = Math.max(0, maxX, maxY);
        for (let j = minY; j <= maxY; j++) {
            let row = "";
            for (let i = minX; i <= maxX; i++) {
                if (checkVisit(i, j)) {
                    row += "■";
                } else {
                    row += "□";
                }
            }
            row += "\n";
            res += row;
        }
        console.log(res);
        return res;
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

