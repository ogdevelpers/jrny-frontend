import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HorizontalScroll.css";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const imagesList = new Array(7).fill("/landing-video-card.png");

export default function HorizontalScrollSections() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {

    ScrollTrigger.getAll().forEach(st => st.kill());

    const slider = sliderRef.current;
    const wrapper = wrapperRef.current;
    if (!slider || !wrapper) return;

    const cards = gsap.utils.toArray<HTMLElement>(".card");
    const viewportWidth = window.innerWidth;
    const cardWidth = cards[0]?.offsetWidth || 300;
    const gap = 10;

    // Total distance to scroll
    const maxSliderShift = (cardWidth + gap) * (cards.length - 1);

    // Initial slider position (centered on first card)
    gsap.set(slider, {
      x: viewportWidth / 2 - cardWidth / 2,
    });

    // Set initial state for all cards
    cards.forEach((card) => {
      gsap.set(card, {
        scale: 0.8,
        opacity: 0.6,
      });
    });

    // Timeline for horizontal slide + scaling
    const tl = gsap.timeline({
      defaults: { ease: "linear" },
      scrollTrigger: {
        trigger: '.pinMe',
        start: "top top",
        end: `+=${maxSliderShift}`, // Add a bit more for spacing
        scrub: 1,  
        pin: ".landing-container",
        anticipatePin: 1,   
      },
    });

    cards.forEach((card, i) => {
      const targetX = viewportWidth / 2 - cardWidth / 2 - (cardWidth + gap) * i;

      tl.to(slider, {
        x: targetX,
        duration: 1,
        onUpdate: () => {
          const currentX = gsap.getProperty(slider, "x") as number;
          cards.forEach((c, j) => {
            const cardCenter = (cardWidth + gap) * j + cardWidth / 2 + currentX;
            const distanceFromCenter = Math.abs(viewportWidth / 2 - cardCenter);
            const scale = gsap.utils.clamp(0.6, 1, 1 - distanceFromCenter / viewportWidth);
            const opacity = gsap.utils.clamp(0.4, 1, 1 - distanceFromCenter / (viewportWidth / 1.5));
            gsap.set(c, { scale, opacity });
          });
        },
      });

      tl.to(card, {
        zIndex: 10,
        duration: 0.01,
      });

      tl.to({}, { duration: 0.2 }); // optional pause

          return () => {
            gsap.killTweensOf(slider);
            ScrollTrigger.killAll();
          };
    });
  }, []);

  return (
    <div className="wrapperH" ref={wrapperRef}>
      <div className="slider" ref={sliderRef}>
        {imagesList.map((image, index) => (
          <div className="card" key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="slide-image" />
          </div>
        ))}
      </div>
    </div>
  );
}
