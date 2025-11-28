import React from "react";

const About = () => {
  return (
    <section className="min-h-screen w-full px-4 md:px-10 py-16 flex flex-col items-center text-white">
      
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-8 text-center">
        About Us
      </h1>

      {/* Content Box */}
      <div className="w-full max-w-5xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl">
        
        {/* Who We Are */}
        <div className="mb-8">
          <h2 className="text-yellow-300 font-semibold text-2xl md:text-3xl mb-4">
            Who We Are
          </h2>
          <p className="text-gray-200 text-sm md:text-base leading-relaxed">
            The Entrepreneurship Cell (E-Cell) at REC Azamgarh is a student-led initiative
            dedicated to fostering innovation, creativity, and entrepreneurial thinking.
            We strive to build a strong startup ecosystem on campus, connecting students
            with mentors, industry experts, and investors.
          </p>
        </div>

        {/* Our Mission */}
        <div className="mb-8">
          <h2 className="text-yellow-300 font-semibold text-2xl md:text-3xl mb-4">
            Our Mission
          </h2>
          <p className="text-gray-200 text-sm md:text-base leading-relaxed">
            To empower young minds to transform ideas into impactful ventures by providing
            the necessary tools, guidance, and opportunities. We organize workshops, bootcamps,
            competitions, and mentorship programs to nurture entrepreneurial skills.
          </p>
        </div>

        {/* Our Vision */}
        <div>
          <h2 className="text-yellow-300 font-semibold text-2xl md:text-3xl mb-4">
            Our Vision
          </h2>
          <p className="text-gray-200 text-sm md:text-base leading-relaxed">
            To create a vibrant campus culture where innovation thrives, startups flourish,
            and students are encouraged to challenge norms and explore solutions that impact society.
          </p>
        </div>

        {/* Call To Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
          <a 
            href="#events" 
            className="px-6 py-3 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition-all duration-300 text-center w-full sm:w-auto"
          >
            Explore Events
          </a>
          <a 
            href="#join" 
            className="px-6 py-3 rounded-xl border border-yellow-300 text-yellow-300 font-semibold hover:bg-white/10 transition-all duration-300 text-center w-full sm:w-auto"
          >
            Join Us
          </a>
        </div>

      </div>

      {/* Footer Note */}
      <p className="text-gray-400 text-xs md:text-sm text-center mt-8">
        &copy; {new Date().getFullYear()} E-Cell REC Azamgarh. All Rights Reserved.
      </p>



    </section>
  );
};

export default About;

