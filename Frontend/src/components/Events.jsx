// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useAuth } from "../context/AuthProvider";



// import workshop from "../assets/Logos/workshop.jpeg";
// import chaupal from "../assets/Logos/chaupal.jpeg";
// import eclinic from "../assets/Logos/eclinic.jpeg";
// import startup from "../assets/Logos/startup.jpeg";



// const fallbackEvents = [
//   {
//     id: "echaupal",
//     title: "E-Chaupal",
//     subtitle: "Grassroots entrepreneurship drive",
//     description:
//       "Connect with rural innovators, understand their challenges, and co-create digital solutions with the E-Cell mentors.",
//     cover_image:
//       chaupal,
//     date: new Date().toISOString(),
//     location: "On campus"
//   },
//   {
//     id: "spotlight",
//     title: "Startup Spotlight",
//     subtitle: "Campus pitch day",
//     description:
//       "Student-led teams pitch their MVPs in front of founders, investors and faculty mentors.",
//     cover_image:
//       startup ,
//     date: new Date().toISOString(),
//     location: "Auditorium"
//   },
//   {
    
//     id: "workshop",
//     title: "International Workshop",
//     subtitle: "Meetup with International Entrepreneur",
//     description:
//       "This week-long workshop features global speakers sharing insights on entrepreneurship. It equips students with strategies, leadership skills and startup knowledge.",
//     cover_image:
//       workshop,
//     date: new Date().toISOString(),
//     location: "Auditorium"
//   },
//   {
//     id: "eclinic",
//     title: "E-Clinic",
//     subtitle: "Way of Startup",
//     description:
//       "E-Clinic helps startups and new entrepreneurs solve challenges in their journey. It connects them with experts to refine ideas, overcome obstacles, and grow their ventures.",
//     cover_image:
//       eclinic,
//     date: new Date().toISOString(),
//     location: "Auditorium"
//   }
// ];

// const Events = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadEvents = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("events")
//           .select("*")
//           .order("date", { ascending: true });

//         if (error) throw error;
//         setEvents(data ?? []);
//       } catch (error) {
//         console.warn("Unable to load events from Supabase:", error);
//         setEvents(fallbackEvents);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadEvents();
//   }, []);

//   const handleRegisterClick = (eventId) => {
//     if (!user) {
//       navigate(`/login?redirect=/dashboard&event=${eventId}`);
//       return;
//     }
//     navigate(`/dashboard?event=${eventId}`);
//   };

//   return (
//     <section className="p-6 md:p-10">
//       <div className="text-center text-white  mb-10">
        
//         <h2 className="text-2xl md:text-3xl font-bold">
//           Build, pitch, and learn with us
//         </h2>
//         <p className="text-white/70">
//           Hands-on programs to sharpen your entrepreneurial mindset.
//         </p>
//       </div>

//       {loading ? (
//         <div className="text-center text-white/70">Loading events...</div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {events.map((event) => (
//             <div
//               key={event.id}
//               className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 flex flex-col text-white hover:-translate-y-2 transition"
//             >
//               {event.cover_image && (
//                 <div
//                   className="h-48 rounded-2xl mb-4 bg-cover bg-center"
//                   style={{ backgroundImage: `url(${event.cover_image})` }}
//                 />
//               )}
//               <p className="text-xs uppercase tracking-[0.4em] text-yellow-400">
//                 {event.date
//                   ? new Date(event.date).toLocaleDateString(undefined, {
//                       day: "numeric",
//                       month: "short"
//                     })
//                   : "TBA"}
//               </p>
//               <h3 className="text-2xl font-semibold mt-2">{event.title}</h3>
//               <p className="text-white/70 text-sm mt-1">{event.subtitle}</p>
//               <p className="text-sm opacity-90 mt-4 flex-1">
//                 {event.description}
//               </p>
//               <p className="text-sm text-white/60 mt-4">
//                 📍 {event.location || "Campus"}
//               </p>
//               <button
//                 onClick={() => handleRegisterClick(event.id)}
//                 className="mt-5 inline-flex justify-center px-4 py-2 rounded-xl font-semibold bg-yellow-300/80 text-black hover:bg-yellow-300 transition"
//               >
//                 Register now
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default Events;

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthProvider";

import workshop from "../assets/Logos/workshop.jpeg";
import chaupal from "../assets/Logos/chaupal.jpeg";
import eclinic from "../assets/Logos/eclinic.jpeg";
import startup from "../assets/Logos/startup.jpeg";

const fallbackEvents = [
  {
    id: "echaupal",
    title: "E-Chaupal",
    subtitle: "Grassroots entrepreneurship drive",
    description:
      "Connect with rural innovators, understand their challenges, and co-create digital solutions with the E-Cell mentors.",
    cover_image: chaupal,
    date: new Date().toISOString(),
    location: "On campus"
  },
  {
    id: "spotlight",
    title: "Startup Spotlight",
    subtitle: "Campus pitch day",
    description:
      "Student-led teams pitch their MVPs in front of founders, investors and faculty mentors.",
    cover_image: startup,
    date: new Date().toISOString(),
    location: "Auditorium"
  },
  {
    id: "workshop",
    title: "International Workshop",
    subtitle: "Meetup with International Entrepreneur",
    description:
      "This week-long workshop features global speakers sharing insights on entrepreneurship. It equips students with strategies, leadership skills and startup knowledge.",
    cover_image: workshop,
    date: new Date().toISOString(),
    location: "Auditorium"
  },
  {
    id: "eclinic",
    title: "E-Clinic",
    subtitle: "Way of Startup",
    description:
      "E-Clinic helps startups and new entrepreneurs solve challenges in their journey. It connects them with experts to refine ideas, overcome obstacles, and grow their ventures.",
    cover_image: eclinic,
    date: new Date().toISOString(),
    location: "Auditorium"
  }
];

const Events = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoScrollRef = useRef(null);
  const transitionRef = useRef(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: true });

        if (error) throw error;
        setEvents(data ?? []);
      } catch (error) {
        console.warn("Unable to load events from Supabase:", error);
        setEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) { // xl screens
        setSlidesToShow(3);
      } else if (window.innerWidth >= 1024) { // lg screens
        setSlidesToShow(3);
      } else if (window.innerWidth >= 768) { // md screens
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total slides
  const totalSlides = Math.ceil(events.length / slidesToShow);

  // Enhanced auto-scroll with smooth looping
  useEffect(() => {
    if (loading || events.length === 0 || isPaused || isTransitioning) return;

    autoScrollRef.current = setInterval(() => {
      handleNextSlide();
    }, 4000);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [loading, events.length, isPaused, isTransitioning, slidesToShow, currentIndex]);

  const handleRegisterClick = (eventId) => {
    if (!user) {
      navigate(`/login?redirect=/dashboard&event=${eventId}`);
      return;
    }
    navigate(`/dashboard?event=${eventId}`);
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    
    if (currentIndex >= events.length - slidesToShow) {
      // Smooth transition to beginning
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }

    // Reset transitioning state after animation completes
    clearTimeout(transitionRef.current);
    transitionRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match CSS transition duration
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    
    if (currentIndex === 0) {
      // Smooth transition to end
      setCurrentIndex(events.length - slidesToShow);
    } else {
      setCurrentIndex(prev => prev - 1);
    }

    clearTimeout(transitionRef.current);
    transitionRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    clearTimeout(transitionRef.current);
    transitionRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Get visible events for current slide
  const getVisibleEvents = () => {
    const endIndex = currentIndex + slidesToShow;
    if (endIndex > events.length) {
      // If we're at the end, combine remaining events with beginning events
      const remaining = events.length - currentIndex;
      const needed = slidesToShow - remaining;
      return [...events.slice(currentIndex), ...events.slice(0, needed)];
    }
    return events.slice(currentIndex, endIndex);
  };

  if (loading) {
    return (
      <section className="p-6 md:p-10">
        <div className="text-center text-white mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            Build, pitch, and learn with us
          </h2>
          <p className="text-white/70">
            Hands-on programs to sharpen your entrepreneurial mindset.
          </p>
        </div>
        <div className="text-center text-white/70">Loading events...</div>
      </section>
    );
  }

  return (
    <section 
      className="p-6 md:p-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="text-center text-white mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">
          Build, pitch, and learn with us
        </h2>
        <p className="text-white/70">
          Hands-on programs to sharpen your entrepreneurial mindset.
        </p>
      </div>

      {/* Desktop Carousel (md screens and up) */}
      <div className="hidden md:block">
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          {events.length > slidesToShow && (
            <>
              <button
                onClick={handlePrevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-3 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous events"
                disabled={isTransitioning}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-3 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next events"
                disabled={isTransitioning}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div className={`flex transition-transform duration-500 ease-in-out ${
              isTransitioning ? 'pointer-events-none' : ''
            }`}>
              {getVisibleEvents().map((event, index) => (
                <div
                  key={`${event.id}-${currentIndex}-${index}`}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 flex flex-col text-white hover:-translate-y-2 transition-all duration-300 h-full">
                    {event.cover_image && (
                      <div
                        className="h-48 rounded-2xl mb-4 bg-cover bg-center"
                        style={{ backgroundImage: `url(${event.cover_image})` }}
                      />
                    )}
                    <p className="text-xs uppercase tracking-[0.4em] text-yellow-400">
                      {event.date
                        ? new Date(event.date).toLocaleDateString(undefined, {
                            day: "numeric",
                            month: "short"
                          })
                        : "TBA"}
                    </p>
                    <h3 className="text-2xl font-semibold mt-2">{event.title}</h3>
                    <p className="text-white/70 text-sm mt-1">{event.subtitle}</p>
                    <p className="text-sm opacity-90 mt-4 flex-1">
                      {event.description}
                    </p>
                    <p className="text-sm text-white/60 mt-4">
                      📍 {event.location || "Campus"}
                    </p>
                    <button
                      onClick={() => handleRegisterClick(event.id)}
                      className="mt-5 inline-flex justify-center px-4 py-2 rounded-xl font-semibold bg-yellow-300/80 text-black hover:bg-yellow-300 transition"
                    >
                      Register now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Dot Indicators */}
          {events.length > slidesToShow && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index * slidesToShow)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / slidesToShow) === index
                      ? 'bg-yellow-400 w-6' 
                      : 'bg-white/40 hover:bg-white/60'
                  } ${isTransitioning ? 'pointer-events-none' : ''}`}
                  aria-label={`Go to slide group ${index + 1}`}
                  disabled={isTransitioning}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Grid (sm screens and below) */}
      <div className="md:hidden grid grid-cols-1 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 flex flex-col text-white"
          >
            {event.cover_image && (
              <div
                className="h-48 rounded-2xl mb-4 bg-cover bg-center"
                style={{ backgroundImage: `url(${event.cover_image})` }}
              />
            )}
            <p className="text-xs uppercase tracking-[0.4em] text-yellow-400">
              {event.date
                ? new Date(event.date).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short"
                  })
                : "TBA"}
            </p>
            <h3 className="text-2xl font-semibold mt-2">{event.title}</h3>
            <p className="text-white/70 text-sm mt-1">{event.subtitle}</p>
            <p className="text-sm opacity-90 mt-4 flex-1">
              {event.description}
            </p>
            <p className="text-sm text-white/60 mt-4">
              📍 {event.location || "Campus"}
            </p>
            <button
              onClick={() => handleRegisterClick(event.id)}
              className="mt-5 inline-flex justify-center px-4 py-2 rounded-xl font-semibold bg-yellow-300/80 text-black hover:bg-yellow-300 transition"
            >
              Register now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;