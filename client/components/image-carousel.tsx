'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface dataProps {
  data?: any; // Adjust the type based on your data structure
}

// const data = [
//   { url: 'https://placehold.co/1920x1080/FFF/000?text=Slide+1', alt: 'A placeholder slide with a black text on a white background' },
//   { url: 'https://placehold.co/1920x1080/000/FFF?text=Slide+2', alt: 'A placeholder slide with a white text on a black background' },
//   { url: 'https://placehold.co/1920x1080/5B21B6/E9D5FF?text=Slide+3', alt: 'A placeholder slide with a purple background' },
// ];

const ImageCarousel: React.FC<dataProps> = ({ data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {/* Carousel for phones (hidden on md and larger screens) */}
      <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-xl md:hidden">
        {/* Main Image */}
        <img
          src={data[currentImageIndex].url}
          alt={data[currentImageIndex].alt}
          className="object-cover w-full h-full transition-opacity duration-500 ease-in-out"
        />

        {/* Navigation Buttons */}
        <button
          onClick={goToPreviousImage}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goToNextImage}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      
      {/* Flexbox layout for tablets and laptops (hidden on phones) */}
      <div className="hidden md:flex justify-center items-center gap-4 w-full p-8 mx-auto">
        {data.map((item: any, index: any) => (
          // <div key={index} className="w-[229px] h-[344px] p-2">
          //   <img src={item.image_url} alt={item.alt} className="w-[229px] h-[344px]" />
          // </div>
          <div className="relative w-[229px] h-[344px]" key={index}>
            <Image
              src={item.image_url}
              alt="Dior Beauty Hero"
              fill
              className="object-cover w-[229px] h-[344px]"
              priority
            />
            {/* <div className="bg-[linear-gradient(to_bottom,transparent,rgba(1,1,1,0.5))] w-[229px] h-[344px] flex flex-col items-center text-center text-white"> */}
            <div className="absolute bg-gradient-dark-gray w-[229px] h-[344px] flex flex-col items-center text-center text-white"
              style={{backgroundImage: 'linear-gradient(to bottom, transparent, rgba(1, 1, 1, 0.5))'}}
            >
              <div className="absolute bottom-[2rem]">
                <p className="text-[1rem] mb-4 max-w-xl font-medium leading-[1.3] tracking-[-.64px]">
                  { item.title }
                </p>
                <a
                  href={ item.link }
                  className="py-2 text-[0.875rem] text-white font-medium leading-[1.2] underline"
                >
                  { item.link_text }
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageCarousel;

