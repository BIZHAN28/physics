import "vector2d";
import "physical_thread";

class ideal_thread extends physical_thread {
    constructor(len = 1, connection_object_1 = physical_object(), connection_object_2 = physical_object()) {
        super();
        this.l = len;
        this.con1 = connection_object_1;
        this.con2 = connection_object_2;
        this.k = 10000;
    }
    calc_force(dT) {
        let pos1 = this.con1.pos;
        let pos2 = this.con2.pos;
        let vel1 = this.con1.v;
        let vel2 = this.con2.v;
        let p1 = pos1.sum(vel1.mul(dT));
        let p2 = pos2.sum(vel2.mul(dT));
        let l = p1.sub(p2).len();
        let dl = max(l - this.l, 0);
        let forceScalar = dl * this.k;
        // force from thread to connection 1
        let F1 = pos2.sub(pos1).norm().mul(forceScalar);
        // force from thread to connection 2
        let F2 = pos1.sub(pos2).norm().mul(forceScalar);
        return [F1, F2];
    }
}