//import "vector2d";

class physical_object {
    pos = new vec2d(0, 0);
    v = new vec2d(0, 0);
    a = new vec2d(0, 0);

    constructor(pos = new vec2d(0, 0), vel = new vec2d(0, 0), acc = new vec2d(0, 0)) {
        this.pos = pos;
        this.v = vel;
        this.a = acc;
    }
}