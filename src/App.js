import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import "primereact/resources/themes/lara-light-purple/theme.css";

import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import pendulum from './pendulum/pendulum';
import {collision_control} from './collision';
import {SVG} from '@svgdotjs/svg.js';
import vec2d from './types/vector2d';
import { draw_pendulum } from './drawer';


function App() {
  const [isPanelVisible, setPanelVisibility] = useState(true);
  const panelRef = useRef(null);


  var timerID = null;
  var glines = [];
  var gpends = [];
  var gcircles = [];
  var grectangles = [];

  const screenWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 20;
  const screenHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 200;

  var draw = useRef(null);

   useEffect(() => {
     draw.current = SVG().addTo('#draw_field').size(screenWidth, screenHeight);

     return () => {
       // Clean up the SVG instance when the component unmounts
       draw.current.clear();
     };
   }, []);

  var numPends = 3;
  var radius = 1;
  var k_hooka = 50;
  var x_podvesa = screenWidth/2/10;
  var y_podvesa = 1;
  var mass = 1;
  var dlina = 20;
  var szhat = 10; //коэффициент растяжения координат в координаты свгшки
  var frame_time = 1000 / 60;
  var time_multiplier = 1;
  // getting from index html radius, mass, length
  var togglePanelVisibility = () => {
    setPanelVisibility(!isPanelVisible);
  };
  var simulation = (pends, lines, rectangles, circles, colors, step_time = 1, coor_coef = 1) => {
      x_podvesa = screenWidth/2/10 - numPends;
      collision_control(pends, step_time)

      for (let i = 0; i < lines.length; i++) {
          draw_pendulum(lines[i], rectangles[i], circles[i], pends[i], colors[i], coor_coef);
      }

      for (let i = 0; i < pends.length; i++) {
          pends[i].step(step_time);
      }

  }

  var stop = () => {
    draw.current.remove();
    draw.current = SVG().addTo('#draw_field').size(screenWidth, screenHeight);
    timerID = null;
    glines = [];
    gpends = [];
    gcircles = [];
    grectangles = [];
  }

  var start = () => {
    console.log(radius, k_hooka, mass);

    if (timerID) return;
    let gcolors = ['#648800', '#008864', '#880064'];
    for (let i = 0; i < numPends; i++) {
        const xOffset = i * 2 * radius;
        const pendulumInstance = new pendulum(mass, radius, dlina, k_hooka, x_podvesa + xOffset, y_podvesa);

        const crds_ = pendulumInstance.getBallCoords(szhat);
        const thrd_ = pendulumInstance.getThreadCoords(szhat);
        const tens_ = pendulumInstance.getTensionWidth(szhat);

        const line = draw.current.line(thrd_).stroke({ color: gcolors[i % 3], width: tens_, linecap: 'round' });
        const rect = draw.current .rect().fill('#FFFFF');
        const circle = draw.current.circle(crds_[2]).move(crds_[0], crds_[1]).fill(gcolors[i % 3]);
        gpends.push(pendulumInstance);
        glines.push(line);
        gcircles.push(circle);
        gcolors.push(gcolors[i % 3]);
        grectangles.push(rect);
    }



    var stepTime = (frame_time / 1000) * time_multiplier;

    gpends[gpends.length - 1].ball.v = new vec2d(10, 0);
    if (timerID == null) {
        frame_time = 20;
        timerID = setInterval(function() { simulation(gpends, glines, grectangles, gcircles, gcolors, stepTime, szhat) }, frame_time);
    }
  }


  return (
     <div className='MAIN' >
       <div id='pannel' ref={panelRef} style={{ transition: 'margin-left 0.5s', marginLeft: isPanelVisible ? 0 : `-${panelRef.current?.offsetWidth-10}px`, position: "fixed" }}>
         <span className="p-float-label">
           <InputNumber minFractionDigits={0} maxFractionDigits={2} id="radius" value={radius} onValueChange={(e) => radius = e.value } useGrouping={false} />
           <label htmlFor="radius">Установите радиус шариков</label>
         </span>
         <span className="p-float-label">
           <InputNumber minFractionDigits={0} maxFractionDigits={2} id="mass" value={1} onValueChange={(e) =>  mass = e.value } useGrouping={false} />
           <label htmlFor="mass">Установите массу шариков</label>
         </span>
         <span className="p-float-label">
           <InputNumber minFractionDigits={0} maxFractionDigits={2} id="length" value={20} onValueChange={(e) => dlina = e.value } useGrouping={false} />
           <label htmlFor="length">Установите длину нити</label>
         </span>
         <span className="p-float-label">
           <InputNumber minFractionDigits={0} maxFractionDigits={2} id="sim_time" value={20} onValueChange={(e) => frame_time = e.value } useGrouping={false} />
           <label htmlFor="sim_time">Установите время одного кадра (мс) </label>
         </span>
         <span className="p-float-label">
           <InputNumber minFractionDigits={0} maxFractionDigits={2} id="time_mult" value={1} onValueChange={(e) => time_multiplier = e.value } useGrouping={false} />
           <label htmlFor="time_mult">Установите ускорение времени <br/>(1 -- совпадает с реальным)</label>
         </span>
         <span className="p-float-label">
           <InputNumber minFractionDigits={0} maxFractionDigits={2} id="hook_text" value={70} onValueChange={(e) => k_hooka = e.value } useGrouping={false} />
           <label htmlFor="hook_text">Установите коэффициент в законе Гука</label>
         </span>
         <span className="p-float-label">
           <InputNumber id="pendulums" value={3} onValueChange={(e) => numPends = e.value } useGrouping={false} />
           <label htmlFor="pendulums">Установите количество маятников</label>
         </span>
           <Button label="Start" onClick={start} />
           <Button label="Stop" onClick={stop} />
           <Button onClick={togglePanelVisibility} label={isPanelVisible ? '<' : '>'} className="round-button" style={{
             position: 'fixed',
             top: "50%",
             //right: 0,
             transform: 'translateY(-50%)',
            }} />
         <br />

       </div>
       <div id="draw_field">

        </div>
     </div>
   );
}

export default App;
