//import "vector2d";
//import "physical_object";
//import "physical_thread";
//import "physical_ball";
//import "fixed_point";
class pendulum {
    
    constructor(mass = 1, radius = 1, len = 3, k = 1, x = 0, y = 0) {
        this.ball = new physical_ball(mass, radius, x, y + len);
        this.point = new fixed_point(x, y);
        this.string = new physical_thread(len, k, this.point, this.ball);
    }
    step(dT) {
        let frc = this.string.calc_force(dT);
        this.ball.recalc_force(frc[1]);
        this.ball.make_step(dT);
    }
    getBallCoords(tr_coef = 1) {
        return [(this.ball.pos.x - this.ball.r) * tr_coef, (this.ball.pos.y - this.ball.r) * tr_coef, this.ball.r * 2 * tr_coef];
    }
    getThreadCoords(tr_coef = 1) {
        return [this.point.pos.x * tr_coef, this.point.pos.y * tr_coef, this.ball.pos.x * tr_coef, this.ball.pos.y * tr_coef];
    }
    getTensionWidth(tr_coef = 1) {
        //let tens = 1 - (this.string.graphic_tension / (Math.abs(this.string.graphic_tension) * +0.1));
        //let tens = (1 / (this.string.graphic_tension * this.string.graphic_tension + 1));
        let tens = this.string.graphic_tension;
        return 1 + Math.min(Math.max(tens * tr_coef * 2, 0), tr_coef * 2);
    }
}