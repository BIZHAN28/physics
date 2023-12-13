var draw;
var timerID = null;
var glines = [];
var gpends = [];
var gcircles = [];
var gcolors = [];
var p_circ, p_line = null;
var p_circ2, p_line2;
var p_circ3, p_line3;


function createPendulum(x, y) {
    return new pendulum(mass, radius, dlina, k_hooka, x, y);
}


function simulation(pends, lines, circles, colors, step_time = 1, coor_coef = 1) {

    collision_control(pends, step_time)
    for (let i = 0; i < lines.length; i++) {
        draw_pendulum(lines[i], circles[i], pends[i], colors[i], coor_coef);
    }
    //draw_pendulum(p_line, p_circ, pend, '#648800', szhat);
    //draw_pendulum(p_line2, p_circ2, pend2, '#008864', szhat);
    //draw_pendulum(p_line3, p_circ3, pend3, '#880064', szhat);

    for (let i = 0; i < pends.length; i++) {
        pends[i].step(step_time);
    }
    //pend.step(stepTime);
    //pend2.step(stepTime);
    //pend3.step(stepTime);
}

function start() {
    var x = 0;
    var y = 100;
    var dx = 2;
    var dy = 2;

    var numPends = 3;

    var radius = 1;
    var k_hooka = parseFloat(document.getElementById("hook_text").value);
    var x_podvesa = 50;
    var y_podvesa = 1;
    var mass = 1;
    var dlina = 20;
    var szhat = 10; //коэффициент растяжения координат в координаты свгшки
    // getting from index html radius, mass, length
    radius = parseFloat(document.getElementById("radius").value);
    mass = parseFloat(document.getElementById("mass").value);
    dlina = parseFloat(document.getElementById("length").value);
    numPends = parseFloat(document.getElementById("pendulums").value);

    //constructor(mass = 1, radius = 1, len = 3, k = 1, x = 0, y = 0)
    let gpends = [];
    let glines = [];
    let gcircles = [];
    let gcolors = ['#648800', '#008864', '#880064'];

    for (let i = 0; i < numPends; i++) {
        const xOffset = i * 2 * radius;
        const pendulumInstance = new pendulum(mass, radius, dlina, k_hooka, x_podvesa + xOffset, y_podvesa);
        
        const crds_ = pendulumInstance.getBallCoords(szhat);
        const thrd_ = pendulumInstance.getThreadCoords(szhat);
        const tens_ = pendulumInstance.getTensionWidth(szhat);
    
        const line = draw.line(thrd_).stroke({ color: gcolors[i % 3], width: tens_, linecap: 'round' });
        const circle = draw.circle(crds_[2]).move(crds_[0], crds_[1]).fill(gcolors[i % 3]);
        
        gpends.push(pendulumInstance);
        glines.push(line);
        gcircles.push(circle);
        gcolors.push(gcolors[i % 3]);
    }


    var frame_time = parseInt(document.getElementById("sim_time").value);
    var time_multiplier = parseFloat(document.getElementById("time_mult").value);
    var stepTime = (frame_time / 1000) * time_multiplier;

    gpends[gpends.length - 1].ball.v = new vec2d(10, 0);
    if (timerID == null) {
        frame_time = 20;
        timerID = setInterval(function() { simulation(gpends, glines, gcircles, gcolors, stepTime, szhat) }, frame_time);
    }
}

function stop() {
    // clear all pends
    delete_pendulums();
    for (let i = 0; i < glines.length; i++) {
        glines[i].remove();
        gcircles[i].remove();
    }
    gpends = [];
    if (timerID != null) {
        clearInterval(timerID);
        timerID = null;
    }
}
SVG.on(document, 'DOMContentLoaded', function() {
    draw = SVG().addTo('#draw_field').size(1000, 1000);
    document.getElementById("draw_field").width = 1000;
    document.getElementById("start").onclick = start;
    document.getElementById("stop").onclick = stop;
});

function reload() {
    location.reload();
}

