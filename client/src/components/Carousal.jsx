import React, { useState, useEffect } from "react";

const Carousal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const urls = [
      "./carousal2.jpeg",
      "./images.jpeg",
      "./carousal4.jpeg",
    ];
    setImages(urls);
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000); // 4 seconds per slide

      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <>
      {images.length > 0 && (
        <div className="relative w-full max-w-6xl mx-auto mt-5 overflow-hidden rounded-xl shadow-2xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              height: "100%",
            }}
          >
            {images.map((imgSrc, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src={imgSrc}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-40 sm:h-52 md:h-60 lg:h-64 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentIndex === index ? "bg-white" : "bg-gray-400"
                  }`}
                ></button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Loading fallback */}
      {images.length === 0 && (
        <div className="w-full max-w-6xl h-40 sm:h-52 md:h-60 lg:h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 mx-auto mt-8">
          Loading images...
        </div>
      )}
    </>
  );
};

export default Carousal;
