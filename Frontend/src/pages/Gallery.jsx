import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

// Component for each gallery section
const GallerySection = ({ title, images, onImageClick }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="backdrop-blur-sm bg-black/10 rounded-3xl p-8 border border-yellow-400/15 hover:border-yellow-400/25 transition-all duration-500 mb-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-3">
          {title}
        </h2>
        <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((img, index) => (
          <div
            key={img.id || index}
            className="group relative overflow-hidden rounded-2xl cursor-pointer backdrop-blur-sm bg-black/10 border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-500 hover:bg-black/20"
            onClick={() => onImageClick(img.image_url)}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={img.image_url}
                alt={`${title} image ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Glassmorphism overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center">
              <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 mb-4">
                <div className="backdrop-blur-md bg-yellow-400/10 border border-yellow-400/20 rounded-full p-3">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Gallery Component
const Gallery = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (imgUrl) => setLightboxImage(imgUrl);

  // Fixed close function
  const closeLightbox = () => setLightboxImage(null);

  const closeOnEscape = (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  };

  // Add event listener for escape key
  useEffect(() => {
    if (lightboxImage) {
      document.addEventListener('keydown', closeOnEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxImage]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  const workshopImages = images.filter(img => img.category === "Workshop");
  const spotlightImages = images.filter(img => img.category === "Spotlight");
  const chaupalImages = images.filter(img => img.category === "E-Chaupal");
  const othersImages = images.filter(img => img.category === "Others");

  return (
    <div className="min-h-screen w-full text-white relative">
      {/* Vanta.js background will be here */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <header className="text-center mb-16 backdrop-blur-sm bg-black/15 rounded-3xl p-8 border border-yellow-400/15 hover:border-yellow-400/25 transition-all duration-500">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-yellow-400">
            E-Cell Moments
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Celebrating innovation, entrepreneurship, and community engagement through
            memorable events and workshops that inspire the next generation of leaders.
          </p>
        </header>

        {/* Main Content with Separate Boxes for Each Section */}
        <main className="space-y-8">
          {loading ? (
            <div className="text-center text-white/60">Loading gallery...</div>
          ) : (
            <>
              <GallerySection
                title="One Week International Workshop"
                images={workshopImages}
                onImageClick={openLightbox}
              />

              <GallerySection
                title="Startup Spotlight"
                images={spotlightImages}
                onImageClick={openLightbox}
              />

              <GallerySection
                title="E-Chaupal"
                images={chaupalImages}
                onImageClick={openLightbox}
              />

              <GallerySection
                title="Others"
                images={othersImages}
                onImageClick={openLightbox}
              />
            </>
          )}
        </main>

        {/* Fixed Lightbox Modal */}
        {lightboxImage && (
          <div
            className="fixed inset-0 backdrop-blur-lg bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
          >
            {/* Lightbox content */}
            <div className="relative max-w-6xl max-h-full">
              <img
                src={lightboxImage}
                alt="Full view"
                className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              />

              {/* Close Button */}
              <button
                className="absolute -top-4 -right-4 backdrop-blur-md bg-black/80 border border-yellow-400/50 rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 hover:bg-yellow-400/30 transition-all duration-300 z-50"
                onClick={closeLightbox}
              >
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation Hint */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-black/70 text-yellow-400 px-4 py-2 rounded-full text-sm border border-yellow-400/40">
                Click outside or press ESC to close
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;