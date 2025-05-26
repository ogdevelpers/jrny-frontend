import { useRef } from "react";
import { gsap } from "gsap";
import "./partnerShow.css";
import { useGSAP } from "@gsap/react";

export default function PartnerShow() {
  return (
    <div className="partner-show-container">
      <div className="partner-show">  
        <div className="shadow-left"></div>
        <div className="partner-rows">
          <PartnerRow />
          <PartnerRow />
          <PartnerRow />
        </div>
        <div className="shadow-right"></div>
      </div>
    </div>
  );
}

function PartnerRow() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const firstTextRef = useRef<HTMLParagraphElement>(null);
  const secondTextRef = useRef<HTMLParagraphElement>(null);
  const animationRef = useRef<number | null>(null);
  const directionRef = useRef(1);
  const xPercentRef = useRef(0);

  useGSAP(() => {
    const animate = () => {
      if (!firstTextRef.current || !secondTextRef.current) return;

      if (xPercentRef.current <= -100) {
        xPercentRef.current = 0;
        directionRef.current = directionRef.current === -1 ? 1 : -1;
      }
      if (xPercentRef.current > 0) {
        xPercentRef.current = -100;
      }

      gsap.set(firstTextRef.current, { xPercent: xPercentRef.current });
      gsap.set(secondTextRef.current, { xPercent: xPercentRef.current });
      xPercentRef.current += 0.15 * directionRef.current;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // Empty dependency array means this runs once

  return ( 
    <div ref={sliderRef} className="partner-row">
      <p ref={firstTextRef} className="partner-row-first" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <img 
            key={`first-${i}`}
            src="/partner-icon.png" 
            alt="" 
            role="presentation"
            loading="lazy"
          />
        ))}
      </p>

      <p ref={secondTextRef} className="partner-row-second" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <img 
            key={`second-${i}`}
            src="/partner-icon.png" 
            alt="" 
            role="presentation"
            loading="lazy"
          />
        ))}
      </p>
    </div>
  );
}