import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './expandingvideo.css';

gsap.registerPlugin(ScrollTrigger);

export default function ExpandingVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const leftCardsRef = useRef(null);
  const rightCardsRef = useRef(null);

useGSAP(() => {
    const video = videoRef.current;
    const leftCards = gsap.utils.toArray('.left-card');
    const rightCards = gsap.utils.toArray('.right-card');

    if (!video || !leftCards.length || !rightCards.length) return;

    gsap.set(video, {
      scale: 0.4, // Start with video at 50% width 
      transformOrigin: "center top", // Set transform origin to center
    })
    gsap.set(leftCards, { 
      opacity: 1,
    });

    gsap.set(rightCards, { 
      opacity: 1,
    });
 
    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 40%",
        end: "bottom 96%",
        scrub: true,
        markers: true, 
      }
    });

    // Add video expansion animation to timeline
    // tl.to(video, {
    //   width: '60vw', // 45vw to 75vw (30vw increase) 
    // });

    tl.to(video,{
      scale: 1,  
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { scope: containerRef });

  const leftCardData = [
    { id: 1, title: 'Card 1', image: 'https://picsum.photos/150/200?random=1' },
    { id: 2, title: 'Card 2', image: 'https://picsum.photos/150/200?random=2' },
  ];

  const rightCardData = [
    { id: 3, title: 'Card 3', image: 'https://picsum.photos/150/200?random=3' },
    { id: 4, title: 'Card 4', image: 'https://picsum.photos/150/200?random=4' },
  ];

  return (
    <div className="expanding-video-wrapper" ref={containerRef}>
      <div className="expanding-video-container">
        {/* Left Cards */}
        <div className="left-cards">
          {leftCardData.map((card) => (
            <div key={`left-${card.id}`} className="left-card card">
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Main Video */}
        <video
          ref={videoRef}
         src="https://cdn-front.freepik.com/revamp/temp/hero/1905-AnonymousHome1920x1080.webm"
          autoPlay
          muted
          loop
          className="expanding-video"
        />

        {/* Right Cards */}
        <div className="right-cards">
          {rightCardData.map((card) => (
            <div key={`right-${card.id}`} className="right-card card">
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}