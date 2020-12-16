// @ts-check

/** A structure to represent a 2d coordinate */
class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    equals(other) {
        return this.x === other.x
            && this.y === other.y;
    }

    isOpposite(other) {
        return this.x === - other.x
            && this.y === - other.y;
    }

    copyWithOffset(offset = new Point(0, 0)) {
        return new Point(this.x + offset.x,
                        this.y + offset.y);
    }
}
