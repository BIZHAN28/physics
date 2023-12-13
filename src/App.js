import logo from './logo.svg';
import './App.css';
import { ReactSVG } from 'react-svg';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import pendulum from './pendulum';
import {collision_control} from './collision';
import collide from './collision';
import {SVG} from '@svgdotjs/svg.js';
import vec2d from './vector2d';
import { draw_pendulum } from './drawer';


function App() {
  var draw;
  var timerID = null;
  var glines = [];
  var gpends = [];
  var gcircles = [];
  var gcolors = [];
  var p_circ, p_line = null;
  var p_circ2, p_line2;
  var p_circ3, p_line3;
  var x = 0;
  var y = 100;
  var dx = 2;
  var dy = 2;

  
  draw = SVG().addTo('#draw_field').size(1000, 1000);

  //draw = SVG.addTo('#draw_field').size(1000, 1000);
  // document.getElementById("draw_field").width = 1000;

  var numPends = 3;

  var radius = 1;
  var k_hooka = 1;
  var x_podvesa = 50;
  var y_podvesa = 1;
  var mass = 1;
  var dlina = 20;
  var szhat = 10; //коэффициент растяжения координат в координаты свгшки
  var frame_time = 1000 / 60;
  var time_multiplier = 1;
  // getting from index html radius, mass, length


  var createPendulum = (x, y) => {
      return new pendulum(mass, radius, dlina, k_hooka, x, y);
  }

  var simulation = (pends, lines, circles, colors, step_time = 1, coor_coef = 1) => {

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

  var start = () => {
    //constructor(mass = 1, radius = 1, len = 3, k = 1, x = 0, y = 0)
    let gpends = [];
    let glines = [];
    let gcircles = [];
    let gcolors = ['#648800', '#008864', '#880064'];
    console.log(numPends);
    for (let i = 0; i < numPends; i++) {
        const xOffset = i * 2 * radius;
        const pendulumInstance = new pendulum(mass, radius, dlina, k_hooka, x_podvesa + xOffset, y_podvesa);
        
        const crds_ = pendulumInstance.getBallCoords(szhat);
        const thrd_ = pendulumInstance.getThreadCoords(szhat);
        const tens_ = pendulumInstance.getTensionWidth(szhat);
    
        const line = draw.line(thrd_).stroke({ color: gcolors[i % 3], width: tens_, linecap: 'round' });
        const circle = draw.circle(crds_[2]).move(crds_[0], crds_[1]).fill(gcolors[i % 3]);
        console.log(pendulumInstance, pendulumInstance.ball, pendulumInstance.ball.v);
        gpends.push(pendulumInstance);
        glines.push(line);
        gcircles.push(circle);
        gcolors.push(gcolors[i % 3]);
    }


    
    var stepTime = (frame_time / 1000) * time_multiplier;

    gpends[gpends.length - 1].ball.v = new vec2d(10, 0);
    if (timerID == null) {
        frame_time = 20;
        timerID = setInterval(function() { simulation(gpends, glines, gcircles, gcolors, stepTime, szhat) }, frame_time);
    }
  }

  return (
    <div className='MAIN'>
      <div id='pannel'>
        <span className="p-float-label">
          <InputNumber id="radius" value={1} onValueChange={(e) => radius = e} useGrouping={false} />
          <label htmlFor="radius">Установите радиус шариков</label>
        </span>
        <span className="p-float-label">
          <InputNumber id="mass" value={1} onValueChange={(e) =>  mass = e } useGrouping={false} />
          <label htmlFor="mass">Установите массу шариков</label>
        </span>
        <span className="p-float-label">
          <InputNumber id="length" value={20} onValueChange={(e) => dlina = e } useGrouping={false} />
          <label htmlFor="length">Установите длину нити</label>
        </span>
        <span className="p-float-label">
          <InputNumber id="sim_time" value={20} onValueChange={(e) => frame_time = e } useGrouping={false} />
          <label htmlFor="sim_time">Установите время одного кадра (мс) </label>
        </span>
        <span className="p-float-label">
          <InputNumber id="time_mult" value={1} onValueChange={(e) => time_multiplier = e } useGrouping={false} />
          <label htmlFor="time_mult">Установите ускорение времени (1 -- совпадает с реальным)</label>
        </span>
        <span className="p-float-label">
          <InputNumber id="hook_text" value={50} onValueChange={(e) => k_hooka = e } useGrouping={false} />
          <label htmlFor="hook_text">Установите коэффициент в законе Гука</label>
        </span>
        <span className="p-float-label">
          <InputNumber id="pendulums" value={3} onValueChange={(e) => numPends = e } useGrouping={false} />
          <label htmlFor="pendulums">Установите количество маятников</label>
        </span>
          <Button label="Start" onClick={start} />
          {/* <Button label="Stop" onClick={stop} /> */}
        <br />
      </div>
      
    </div>
  );
}

export default App;