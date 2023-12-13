class vec2d {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    sum(vec) {
        return new vec2d(this.x + vec.x, this.y + vec.y);
    }
    sub(vec) {
        return new vec2d(this.x - vec.x, this.y - vec.y);
    }
    mul(scalar) {
        let nx = this.x * scalar;
        let ny = this.y * scalar;
        return new vec2d(nx, ny);
    }
    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }
    sqrlen() {
        return this.dot(this);
    }
    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    norm() {
        let leni = 1 / this.len();
        return this.mul(leni);
    }
}