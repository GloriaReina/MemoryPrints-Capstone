import React from 'react';
import './HeroSection.css';


function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/video/video-1.mp4' autoPlay loop muted />
      <h1> THE JOURNEY AWAITS</h1>
      <p> Write, Share, Connect</p>

      <div className='hero-btns'>
      </div>
    </div>
  );
}

export default HeroSection;