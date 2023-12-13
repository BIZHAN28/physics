//import "vector2d";
//import "physical_object";

class physical_ball extends physical_object {
    constructor(mass = 1, radius = 1, x = 0, y = 0) {
        super();
        this.m = mass;
        this.pos = new vec2d(x, y);
        this.F = new vec2d(0, 0);
        this.g = new vec2d(0, 9.81);
        this.r = radius;
    }
    test_collision(other) {
        return this.pos.sub(other.pos).sqrlen() <= (this.r + other.r) * (this.r + other.r);
    }
    test_collision_time(other, dT) {
        let newPos1 = this.pos.sum(this.v.mul(dT));
        let newPos2 = other.pos.sum(other.v.mul(dT));
        let dist = newPos1.sub(newPos2).sqrlen()
        let dballrot = (this.r + other.r);
        let dball = dballrot * dballrot;
        return dist <= dball;
    }
    add_acc(dT) {
        this.v = this.v.sum(this.a.mul(dT));
    }
    add_vel(dT) {
        this.pos = this.pos.sum(this.v.mul(dT));
    }
    add_force(force) {
        this.F = this.F.sum(force);
    }
    recalc_force(additional = new vec2d(0, 0)) {
        this.F = this.g.mul(this.m).sum(additional);
    }
    calc_acc() {
        this.a = this.F.mul(1 / this.m);
    }
    get_impulse() {
        return this.v.mul(this.m);
    }
    make_step(dT) {
        this.calc_acc();
        this.add_acc(dT);
        this.add_vel(dT);
    }
}