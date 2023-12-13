//import "vector2d";
//import "physical_object";

import vec2d from "./vector2d";
import physical_object from "./physical_object";

class fixed_point extends physical_object {
    constructor(x = 0, y = 0) {
        super();
        this.pos.x = x;
        this.pos.y = y;
    }
}

export default fixed_point;