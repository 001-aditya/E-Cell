import { TypeAnimation } from "react-type-animation";   

const Type = () => {
  const isMobile = window.innerWidth < 600;
    return(

<TypeAnimation
  sequence={[
    "Your vision, our mission - limitless possibilities.",
    1000,
    "Building tomorrow, one breakthrough at a time.",
    1000,
    "Innovate, Inspire, Impact - together we rise.",
    1000,
  ]}
  repeat={Infinity}
  wrapper="span"
  cursor={true}

  style={{
     fontSize: '3vw',
     display: 'inline-block',
      color: 'orange',
      fontWeight: '600'
      }}
/>
    );
};

export default Type;

