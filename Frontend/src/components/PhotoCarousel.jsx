import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import chaupal2 from "../assets/Gallery/chaupal2.jpg";
 import chaupal3 from "../assets/Gallery/chaupal3.jpg";
 import chaupal4 from "../assets/Gallery/chaupal4.jpeg";
 import chaupal1 from "../assets/Gallery/chaupal1.jpg";
 import week1  from "../assets/Gallery/week1.jpg";
 import week2 from "../assets/Gallery/week2.jpg";
 import week3 from "../assets/Gallery/week3.jpg";
 import week5 from "../assets/Gallery/week5.jpg";
 import week6 from "../assets/Gallery/week6.jpg";
 import week7 from "../assets/Gallery/week7.jpg";
 import week8 from "../assets/Gallery/week8.jpg";
 import week9 from "../assets/Gallery/week9.jpg";
 import week10 from "../assets/Gallery/week10.jpg";
 import week11 from "../assets/Gallery/week11.jpeg";
 import week12 from "../assets/Gallery/week12.jpg";




const photos = [

  { id: 1, url: chaupal2 },
  {id: 2, url: chaupal3},
  {id: 3, url: chaupal4},
  {id: 4, url: chaupal1},
  {id: 5, url: week1},
  {id: 6, url: week2},
  {id: 7, url: week3},
  {id: 8, url: week5},
  {id: 9, url: week6},
  {id: 10, url: week7},
  {id: 11, url: week8},
  {id: 12, url: week9},
  {id: 13, url: week10},
  {id: 14, url: week11},
  {id: 15, url: week12}
 
  ];

const PhotoCarousel = () => {
  return (
    <section className="p-6 md:p-12 lg:p-16">
      {/* Header */}
      <div className="text-center text-white mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-yellow-400">
          Our Gallery
        </h2>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-bold">
          Capturing moments that inspire innovation and creativity
        </p>
      </div>

      {/* Swiper Carousel */}
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={600}
          spaceBetween={20}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
            1536: { slidesPerView: 5 },
          }}
          className="pb-12"
        >
          {photos.map((photo) => (
            <SwiperSlide key={photo.id}>
              <div className="relative group transition-transform duration-500 hover:scale-[1.03]">
                <div className="overflow-hidden rounded-2xl border border-yellow-400 shadow-x1 bg-white/5 border-3 bg-grey-900 h-64 lg:h-80">
                  <img
                    src={photo.url}
                    alt={`Gallery image ${photo.id}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 p-3"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PhotoCarousel;
