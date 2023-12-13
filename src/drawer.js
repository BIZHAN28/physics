function draw_pendulum(line_obj, circle_obj, pend_obj, colr = "#648800", coords_deform = 1) {

    let thrd_ = pend_obj.getThreadCoords(coords_deform);
    let tens_ = pend_obj.getTensionWidth(coords_deform);
    let crds_ = pend_obj.getBallCoords(coords_deform);
    line_obj.plot(thrd_).stroke({ color: colr, width: tens_, linecap: 'round' });;
    circle_obj.move(crds_[0], crds_[1]);

}
// function to delete all pendulums
function delete_pendulums() {
    for (let i = 0; i < gpends.length; i++) {
        line_obj.remove();
        circle_obj.remove();

    }
    gpends = [];
    glines = [];
    gcircles = [];
    gcolors = [];
}

