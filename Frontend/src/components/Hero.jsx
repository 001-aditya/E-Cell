
import Type from "./Type";
import logo from "../assets/Logos/logo.jpeg";

const Hero = () => {
  return (
    <section className="min-h-screen overflow-hidden md:pt-[2vw]  pt-[10vw] px-[2vw]">
      
      {/* Main Heading and Type Effect */}
      <div className="flex flex-col text-center justify-center mb-[12vw] md:mb-[6vw] mt-[2vw] md:mt-[3vw]">
        
        <h1
  className="text-white
         font-inter font-bold
         text-4xl md:text-5xl lg:text-6xl xl:text-7xl
         mb-[2vw] md:mb-[0.5vw]
         
         drop-shadow-[0_0_5px_rgba(200, 190, 140, 0.45)]
         transition-all duration-300 ease-out
         hover:drop-shadow-[0_0_20px_rgba(200, 190, 140, 0.45)]
         hover:scale-105 relative cursor-pointer"
>
  <span className="text-yellow-400">E-Cell</span> REC Azamgarh
</h1>
    
        <Type/>
      </div>

      
      <div className="max-w-full  flex flex-col lg:flex-row items-center justify-center gap-[7vw] px-4 ">
        
        {/* Glassmorphism Content Box */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
          <div className="
            backdrop-blur-xl 
            bg-white/10 
            border border-white/20 
            rounded-2xl
            p-6 md:p-8
            w-full
            max-w-2xl
            shadow-2xl
            hover:shadow-3xl
            transition-all
            duration-500
            hover:scale-105
            z-10
          ">
            
            <h1 className="text-yellow-400 text-xl md:text-2xl lg:text-3xl font-inter font-bold mb-4 md:mb-6 text-center lg:text-left">
              Why E-Cell?
            </h1>
            
          
            <div className="space-y-4 md:space-y-6">
              <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed text-center lg:text-left">
                The Entrepreneurship Cell at REC Azamgarh is a student-driven initiative 
                dedicated to fostering innovation, creativity, and entrepreneurial spirit 
                among students. We provide a platform for aspiring entrepreneurs to transform 
                their ideas into successful ventures.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="text-center lg:text-left">
                  <h3 className="text-yellow-300 font-semibold text-sm md:text-base mb-2">🚀 Our Mission</h3>
                  <p className="text-gray-300 text-xs md:text-sm">
                    To nurture future leaders and innovators through entrepreneurial education
                  </p>
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="text-yellow-300 font-semibold text-sm md:text-base mb-2">💡 Our Vision</h3>
                  <p className="text-gray-300 text-xs md:text-sm">
                    Creating an ecosystem where ideas flourish and startups thrive
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10 justify-center lg:justify-start">
              <button className="
                px-6 md:px-8 
                py-3 md:py-4 
                rounded-xl 
                font-semibold 
                text-sm md:text-base
                bg-yellow-400/90 
                hover:bg-yellow-300 
                text-gray-900 
                transition-all 
                duration-300 
                transform 
                hover:scale-105 
                hover:shadow-lg
                border border-yellow-300
                backdrop-blur-sm
                w-full sm:w-auto
              ">
                Explore Events
              </button>
              
              <button className="
                px-6 md:px-8 
                py-3 md:py-4 
                rounded-xl 
                font-semibold 
                text-sm md:text-base
                bg-transparent 
                hover:bg-white/10 
                text-yellow-300 
                border border-yellow-300/50 
                hover:border-yellow-300 
                transition-all 
                duration-300 
                transform 
                hover:scale-105 
                hover:shadow-lg
                backdrop-blur-sm
                w-full sm:w-auto
              ">
                Register Now
              </button>
            </div>
          </div>
        </div>

        {/* Logo visual */}
        <div className="w-full lg:w-1/2 flex justify-center z-0">
          <div className="
            w-full 
            max-w-md 
            md:max-w-lg 
            lg:max-w-xl 
            xl:max-w-2xl
            transform 
            hover:scale-105 
            transition-transform 
            duration-500
            -z-5
          ">
            <img
              src={logo}
              alt="E-Cell REC Azamgarh logo"
              className="w-full h-auto  object-contain rounded-3xl border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Flagship Events Heading */}
      <h1 className="
        text-yellow-300 
        text-center 
        font-sans 
        font-bold 
        text-2xl md:text-4xl lg:text-5xl 
        mt-[8vw]
       
      ">
        OUR INITATIVES
      </h1>
    </section>
  );
};

export default Hero;

