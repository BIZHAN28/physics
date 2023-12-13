function draw_pendulum(line_obj,rect_obj, circle_obj, pend_obj, colr = "#648800", coords_deform = 1) {

    let thrd_ = pend_obj.getThreadCoords(coords_deform);
    let tens_ = pend_obj.getTensionWidth(coords_deform);
    let crds_ = pend_obj.getBallCoords(coords_deform);


    line_obj.plot(thrd_).stroke({ color: colr, width: tens_, linecap: 'round' });

    const rectWidth = 100;
    const rectHeight = 50;
    rect_obj.width(rectWidth).height(rectHeight).move(thrd_[0]-rectWidth/2, thrd_[1]-rectHeight);

    circle_obj.move(crds_[0], crds_[1]);

}

export { draw_pendulum };
