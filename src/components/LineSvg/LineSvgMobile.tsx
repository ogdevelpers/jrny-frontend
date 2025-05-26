import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import { useGSAP } from '@gsap/react'; 
import useIsMobile from '../../hooks/useIsMobile';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const LineSvgMobile: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const coverPathRef = useRef<SVGPathElement>(null);
  const originalPathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);

  const [rightEdge, setRightEdge] = React.useState((window?.innerWidth as number) );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth !== rightEdge) { 
        setRightEdge(window.innerWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call to set the right edge
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[]);

  useGSAP(() => {
    if (!svgRef.current || !coverPathRef.current || !originalPathRef.current || !glowPathRef.current) return;

    const path = originalPathRef.current;
    const pathLength = path.getTotalLength();
    const coverWidth = 7;
    const coverLength = 120;
    const glowWidthMultiplier = 7;

    const createEllipticalShadowFilter = (id: string, blur: number) => {
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.id = id;
      filter.setAttribute('x', '-50%');
      filter.setAttribute('y', '-50%');
      filter.setAttribute('width', '200%');
      filter.setAttribute('height', '200%');

      const feOffset = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
      feOffset.setAttribute('dx', '0');
      feOffset.setAttribute('dy', '0');
      feOffset.setAttribute('result', 'offset');

      const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
      feGaussianBlur.setAttribute('stdDeviation', String(blur));
      feGaussianBlur.setAttribute('result', 'blur');

      const feComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
      feComposite.setAttribute('in', 'blur');
      feComposite.setAttribute('in2', 'SourceAlpha');
      feComposite.setAttribute('operator', 'in');
      feComposite.setAttribute('result', 'shadow');

      const feFlood = document.createElementNS('http://www.w3.org/2000/svg', 'feFlood');
      feFlood.setAttribute('flood-color', '#FF5408');
      feFlood.setAttribute('result', 'color');

      const feComposite2 = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
      feComposite2.setAttribute('in', 'color');
      feComposite2.setAttribute('in2', 'shadow');
      feComposite2.setAttribute('operator', 'in');

      const feComposite3 = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
      feComposite3.setAttribute('in', 'SourceGraphic');
      feComposite3.setAttribute('operator', 'over');

      filter.appendChild(feOffset);
      filter.appendChild(feGaussianBlur);
      filter.appendChild(feComposite);
      filter.appendChild(feFlood);
      filter.appendChild(feComposite2);
      filter.appendChild(feComposite3);

      return filter;
    };

    const blurFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    blurFilter.id = 'blur-filter';
    blurFilter.setAttribute('x', '-50%');
    blurFilter.setAttribute('y', '-50%');
    blurFilter.setAttribute('width', '200%');
    blurFilter.setAttribute('height', '200%');

    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('stdDeviation', '26.9');
    blurFilter.appendChild(feGaussianBlur);

    const createRadialGradient = (id: string, colors: { offset: string; color: string }[], transform: string) => {
      const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
      gradient.id = id;
      gradient.setAttribute('cx', '50%');
      gradient.setAttribute('cy', '50%');
      gradient.setAttribute('r', '50%');
      gradient.setAttribute('fx', '50%');
      gradient.setAttribute('fy', '50%');
      gradient.setAttribute('gradientTransform', transform);

      colors.forEach(stop => {
        const stopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stopElement.setAttribute('offset', stop.offset);
        stopElement.setAttribute('stop-color', stop.color);
        gradient.appendChild(stopElement);
      });

      return gradient;
    };

    const primaryGradient = createRadialGradient(
      'primary-gradient',
      [
        { offset: '0%', color: '#FFCB64' },
        { offset: '70%', color: '#FFCB64' },
        { offset: '90%', color: '#FF7A00' },
        { offset: '100%', color: '#FF4900' }
      ],
      'scale(1, 0.25)'
    );

    const glowGradient = createRadialGradient(
      'glow-gradient',
      [
        { offset: '0%', color: '#FFCB64' },
        { offset: '60%', color: '#FFCB64' },
        { offset: '85%', color: '#FF7A00' },
        { offset: '100%', color: '#FF5408' }
      ],
      'scale(1, 0.2)'
    );

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    [
      { id: 'shadow-4px', blur: 4.52 },
      { id: 'shadow-9px', blur: 9.04 },
      { id: 'shadow-32px', blur: 31.65 },
      { id: 'shadow-63px', blur: 63.29 },
      { id: 'shadow-108px', blur: 108.5 },
      { id: 'shadow-190px', blur: 189.88 }
    ].forEach(filter => defs.appendChild(createEllipticalShadowFilter(filter.id, filter.blur)));

    defs.appendChild(blurFilter);
    defs.appendChild(primaryGradient);
    defs.appendChild(glowGradient);
    svgRef.current.appendChild(defs);

    const getNormalAtLength = (path: SVGPathElement, length: number) => {
      const EPSILON = 1.5;
      const point1 = path.getPointAtLength(Math.max(0, length - EPSILON));
      const point2 = path.getPointAtLength(Math.min(pathLength, length + EPSILON));

      const dx = point2.x - point1.x;
      const dy = point2.y - point1.y;
      const magnitude = Math.sqrt(dx * dx + dy * dy);

      return {
        x: -dy / magnitude,
        y: dx / magnitude
      };
    };

    const generatePathData = (points: { x: number; y: number }[]) =>
      points.map((p, i) => (i === 0 ? 'M' : 'L') + p.x + ',' + p.y).join(' ') + ' Z';

    const updatePaths = (progress: number) => {
      const centerLength = progress * pathLength;
      let startLength = Math.max(0, centerLength - coverLength / 2);
      let endLength = Math.min(pathLength, centerLength + coverLength / 2);

      if (endLength - startLength < coverLength) {
        if (centerLength < pathLength / 2) {
          endLength = startLength + coverLength;
        } else {
          startLength = endLength - coverLength;
        }
      }

      const segments = 40;
      const coverPoints = [];
      const glowPoints = [];
      const baseGlowWidth = coverWidth * glowWidthMultiplier;

      for (let i = 0; i <= segments; i++) {
        const ratio = i / segments;
        const length = startLength + ratio * coverLength;
        const point = path.getPointAtLength(length);
        const normal = getNormalAtLength(path, length);
        const ellipticalFactor = Math.sin(Math.PI * ratio);
        const currentWidth = coverWidth * (0.6 + 0.4 * ellipticalFactor);
        const glowWidth = baseGlowWidth * (0.2 + 0.8 * ellipticalFactor);

        coverPoints.push({
          x: point.x + normal.x * currentWidth / 2,
          y: point.y + normal.y * currentWidth / 2
        });
        glowPoints.push({
          x: point.x + normal.x * glowWidth / 2,
          y: point.y + normal.y * glowWidth / 2
        });
      }

      for (let i = segments; i >= 0; i--) {
        const ratio = i / segments;
        const length = startLength + ratio * coverLength;
        const point = path.getPointAtLength(length);
        const normal = getNormalAtLength(path, length);
        const ellipticalFactor = Math.sin(Math.PI * ratio);
        const currentWidth = coverWidth * (0.6 + 0.4 * ellipticalFactor);
        const glowWidth = baseGlowWidth * (0.2 + 0.8 * ellipticalFactor);

        coverPoints.push({
          x: point.x - normal.x * currentWidth / 2,
          y: point.y - normal.y * currentWidth / 2
        });
        glowPoints.push({
          x: point.x - normal.x * glowWidth / 2,
          y: point.y - normal.y * glowWidth / 2
        });
      }

      coverPathRef.current?.setAttribute('d', generatePathData(coverPoints));
      glowPathRef.current?.setAttribute('d', generatePathData(glowPoints));
    };


    gsap.to(coverPathRef.current, {
      scrollTrigger: {
        trigger: ".line-outlier-mobile",
        start: "top top",
        end: "+=4140", 
        scrub: true,  
        onUpdate: (self) => updatePaths(self.progress ), 
      }, 
    });

    return () => {
      gsap.killTweensOf(coverPathRef.current);
      ScrollTrigger.killAll();
    };
  }, []); 

  const isMobile = useIsMobile(450);

  const smallScreen = `M${rightEdge/2},40 L${rightEdge/2},40 L${rightEdge/2},160 L2,300 L2,1850 L${rightEdge},1900 L${rightEdge},3040 L2,3140 L2,3290`

  const d = isMobile ? smallScreen
  : `M${rightEdge/2},40 L${rightEdge/2},40 L${rightEdge/2},160 L2,300 L2,1900 L${rightEdge},1950 L${rightEdge},3380 L2,3440 L2,3590`

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${rightEdge} 4000`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', pointerEvents: 'none' }}
    >
      {/* Definitions are still generated programmatically in useGSAP */}
      <path
        ref={originalPathRef}
        id="mainPath"
        d={d ?? smallScreen}
        fill="none"
        stroke="#FF5B00"
        strokeWidth="4"
      />
      <g filter="url(#blur-filter)">
        <path ref={glowPathRef} fill="url(#glow-gradient)" filter="url(#shadow-190px)" opacity="0.6" />
        <path ref={glowPathRef} fill="url(#glow-gradient)" filter="url(#shadow-108px)" opacity="0.7" />
        <path ref={glowPathRef} fill="url(#glow-gradient)" filter="url(#shadow-63px)" opacity="0.8" />
        <path ref={glowPathRef} fill="url(#glow-gradient)" filter="url(#shadow-32px)" opacity="0.9" />
        <path ref={glowPathRef} fill="url(#glow-gradient)" filter="url(#shadow-9px)" opacity="0.95" />
        <path ref={glowPathRef} fill="url(#glow-gradient)" filter="url(#shadow-4px)" opacity="1" />
      </g>
      <path
        ref={coverPathRef}
        fill="url(#primary-gradient)"
        stroke="#FF5B00"
        strokeWidth="1.1"
        strokeOpacity="0.8"
      />
    </svg>
  );
};

export default LineSvgMobile;
