"use client";


import { useAnimation } from '@/context/animation-context';
import { useState, useEffect, useRef } from 'react';

const ScrollVideo = () => {

  const [contentHeight, setContentHeight] = useState('calc(100vh - 80px)');

  const { isAnimationActive } = useAnimation();

  return (
    <div 
      className={`relative flex transition-all duration-900 ease-in-out
      ${isAnimationActive ? 'flex-row' : 'flex-col'} w-auto mt-[80px]`}
    >
      
      {/* The video section on the left.
          It transitions from full width to half width. */}
      <div className={`flex-shrink-0 transition-all duration-700 ease-in-out relative py-4 items-center justify-center mx-auto   
        ${isAnimationActive ? 'w-1/2' : 'w-full'}`}
        style={{ height: isAnimationActive ? '100vh' : contentHeight }}
      >
        <video
          className={`absolute inset-0 w-auto object-cover shadow-xl mx-auto ${isAnimationActive ? 'h-[100%]' : 'h-[400px] my-auto'}`}
          loop
          muted
          autoPlay
          playsInline
        >
          <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* The content section on the right.
          It transitions from zero width/opacity to half width/full opacity. */}
      <div className={`flex-grow-0 transition-all duration-700 ease-in-out
        ${isAnimationActive ? 'w-1/2 opacity-100' : 'w-0 opacity-0'}
        h-full flex items-center justify-center`}>
        <div className="p-8 md:p-16">
          <div className="max-w-md bg-white/20 backdrop-blur-md p-6 sm:p-8 rounded-lg shadow-xl text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unleash Your Potential</h2>
            <p className="text-base leading-relaxed mb-6">
              Discover a new perspective as the world unfolds before you. This content appears as you scroll, revealing a new dimension to our story.
            </p>
            <a
              href="#"
              className="inline-block px-6 py-3 bg-white text-gray-800 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Explore Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollVideo;