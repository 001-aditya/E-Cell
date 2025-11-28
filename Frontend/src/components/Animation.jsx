

import React from 'react';
import Lottie from 'lottie-react';
import animationData from './animations/startup-growth.json';

const AnimationComponent = () => {
  return (
    <div className="
      w-full
      md:w-[60vw]
     
     
      h-auto
      aspect-square
    ">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        className="w-full h-full"
      />
    </div>
  );
};

export default AnimationComponent;


