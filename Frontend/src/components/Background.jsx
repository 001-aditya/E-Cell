import React, { useEffect } from "react";
import NET from 'vanta/src/vanta.net';

function Background() {

useEffect(() => {
  const vantaEffect = NET({
    el: "#vanta",
    mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x825f21,
  backgroundColor: 0x0
  });
  
  return () => {
    if (vantaEffect) vantaEffect.destroy();
  };
}, []);


  
  return (
    
      <div className="fixed inset-0 -z-10 pointer-events-none" id="vanta"></div>
   
  );
}


export default Background;

