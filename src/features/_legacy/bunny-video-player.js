'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BunnyVideoPlayer = ({
  className = '',
  aspectRatio = '9:16',
  controls = false,
  autoPlay = true,
  muted = true,
  loop = true,
  videoLibraryId = '458960',
  videoId = '38690d4b-c314-4a2c-83e8-e85120f28712',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Fixed URL with proper parameters for portrait 1080p video
  const videoUrl = `https://iframe.mediadelivery.net/embed/${videoLibraryId}/${videoId}?autoplay=${autoPlay ? 'true' : 'false'}&muted=${muted ? 'true' : 'false'}&loop=${loop ? 'true' : 'false'}&controls=${controls ? 'true' : 'false'}&responsive=true&t=0&volume=100&color=FFFFFF&primaryColor=FFFFFF&dnt=true`;

  useEffect(() => {
    const iframe = document.querySelector('.bunny-iframe');
    if (iframe) {
      const handleLoad = () => setIsLoaded(true);
      const handleError = () => setError('Failed to load video');
      
      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);
      
      return () => {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
      };
    }
  }, []);

  if (error) {
    return (
      <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${className}`}>
        <strong>Error loading video</strong>
        <div className="mt-2">
          <p>URL: {videoUrl}</p>
          <p>Try these solutions:</p>
          <ul className="list-disc pl-5">
            <li>Check your internet connection</li>
            <li>Disable ad blockers</li>
            <li>Verify the video exists in BunnyCDN</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className} transform transition-all duration-300 ease-in-out hover:scale-110 shadow-2xl hover:shadow-3xl`} style={{ 
      width: '100%',
      maxWidth: '450px', // Much larger container
      aspectRatio: aspectRatio === '9:16' ? '9/16' : '16/9'
    }}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-2xl">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <iframe
        className={`bunny-iframe w-full h-full rounded-2xl ${!isLoaded ? 'invisible' : 'visible'}`}
        src={videoUrl}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
        title="Video Player"
        style={{ 
          border: 'none',
          transform: 'scale(3.4)', // Perfect scale to completely fill the frame
          transformOrigin: 'center center'
        }}
      />
    </div>
  );
};

BunnyVideoPlayer.propTypes = {
  className: PropTypes.string,
  aspectRatio: PropTypes.oneOf(['16:9', '9:16']),
  controls: PropTypes.bool,
  autoPlay: PropTypes.bool,
  muted: PropTypes.bool,
  loop: PropTypes.bool,
  videoLibraryId: PropTypes.string,
  videoId: PropTypes.string,
};

BunnyVideoPlayer.defaultProps = {
  className: '',
  aspectRatio: '9:16',
  controls: false,
  autoPlay: true,
  muted: true,
  loop: true,
  videoLibraryId: '458960',
  videoId: '38690d4b-c314-4a2c-83e8-e85120f28712',
};

export default BunnyVideoPlayer;