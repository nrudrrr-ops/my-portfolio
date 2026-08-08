import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------
   SIZING SYSTEM — single source of truth for every card size.
   distance 0 = active, 1 = near side, 2+ = far side.
------------------------------------------------------------------- */
const SIZES = {
  active: { height: 76 },   // vh — width auto via 3:4 aspect-ratio
  near:   { height: 34 },
  far:    { height: 22 },
  gap: 18,                  // px
  mobile: {
    active: { height: 48 },
    near:   { height: 26 },
    far:    { height: 16 },
    gap: 10,
  },
};

const PROJECTS = [
  { id: 1, title: 'Smart Workflow System', tag: 'Process Design', year: '2026', image: '/images/1.jpeg' },
  { id: 2, title: 'QueueFlow', tag: 'Service Ops', year: '2025', image: '/images/2s.jpeg' },
  { id: 3, title: 'Northline Identity', tag: 'Brand Strategy', year: '2025', image: '/images/3.jpeg' },
  { id: 4, title: 'Performance Dashboard', tag: 'Analytics', year: '2024', image: '/images/4.jpeg' },
  { id: 5, title: 'Make It Matter', tag: 'Marketing', year: '2024', image: '/images/5.jpeg' },
  { id: 6, title: 'Canvas Design System', tag: 'Systems', year: '2024', image: '/images/6.jpeg' },
];

const ScrollShowcase = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // SCROLL -> INDEX
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const getScrollLength = () => window.innerHeight * 0.7 * (PROJECTS.length - 1);

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollLength()}`,
        pin: true,
        scrub: 0.4,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const raw = self.progress * (PROJECTS.length - 1);
          const idx = Math.min(PROJECTS.length - 1, Math.max(0, Math.round(raw)));
          setActiveIndex((prev) => (prev === idx ? prev : idx));
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // INDEX -> CENTER the active card inside the full-width viewport
  useLayoutEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const activeCard = cardRefs.current[activeIndex];
    if (!track || !viewport || !activeCard) return;

    const viewportWidth = viewport.offsetWidth;
    const offset =
      viewportWidth / 2 - activeCard.offsetWidth / 2 - activeCard.offsetLeft;

    gsap.to(track, {
      x: offset,
      duration: 0.3,
      ease: 'power3.out',
    });
  }, [activeIndex]);

  const setCardRef = useCallback((el, index) => {
    cardRefs.current[index] = el;
  }, []);

  return (
    <div className="featured-showcase" id="featured" ref={sectionRef}>
      <style>{`
        .featured-showcase {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(ellipse 55% 65% at 64% 50%, rgba(255,70,40,0.35), transparent 65%),
            linear-gradient(135deg, #4a0000 0%, #1a0000 100%);
          color: #fff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .featured-inner {
          display: flex;
          align-items: center;
          height: 100%;
          width: 100%;
        }

        /* ---- Cards fill the full width edge-to-edge (no left text panel) ---- */
        .featured-cards-viewport {
          flex: 1 1 100%;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          overflow: hidden;
          position: relative;
        }

        .featured-track {
          display: flex;
          align-items: center;
          gap: ${SIZES.gap}px;
          will-change: transform;
        }

        .featured-card {
          position: relative;
          flex-shrink: 0;
          aspect-ratio: 3 / 4;
          border-radius: 14px;
          overflow: hidden;
          background: #000;
          cursor: pointer;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45);
          transition: height 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.28s ease,
                      outline-offset 0.28s ease;
          height: ${SIZES.far.height}vh;
          opacity: 0.3;
          filter: grayscale(25%);
        }

        .featured-card.is-near {
          height: ${SIZES.near.height}vh;
          opacity: 0.55;
          filter: grayscale(10%);
        }

        .featured-card.is-active {
          height: ${SIZES.active.height}vh;
          opacity: 1;
          filter: grayscale(0%);
          z-index: 5;
        }

        .featured-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .featured-card-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px;
          background: linear-gradient(to top, rgba(0,0,0,0.75), transparent);
          opacity: 0;
          transition: opacity 0.25s ease;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: rgba(255,255,255,0.9);
        }

        .featured-card.is-active .featured-card-label {
          opacity: 1;
        }

        /* ---- BOTTOM : centered scroll hint ---- */
        .featured-hint {
          position: absolute;
          bottom: 4vh;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 20;
        }

        .featured-hint .circle {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          animation: hint-bounce 2s ease-in-out infinite;
        }

        .featured-hint span {
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
        }

        @keyframes hint-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(4px); opacity: 1; }
        }

        @media (max-width: 768px) {
          .featured-card { height: ${SIZES.mobile.far.height}vh; }
          .featured-card.is-near { height: ${SIZES.mobile.near.height}vh; }
          .featured-card.is-active {
            height: ${SIZES.mobile.active.height}vh;
            outline-offset: 8px;
          }
          .featured-track { gap: ${SIZES.mobile.gap}px; }
        }
      `}</style>

      <div className="featured-inner">
        <div className="featured-cards-viewport" ref={viewportRef}>
          <div className="featured-track" ref={trackRef}>
            {PROJECTS.map((project, index) => {
              const distance = Math.abs(index - activeIndex);
              const stateClass =
                distance === 0 ? 'is-active' : distance === 1 ? 'is-near' : '';
              return (
                <div
                  key={project.id}
                  ref={(el) => setCardRef(el, index)}
                  className={`featured-card ${stateClass}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <img src={process.env.PUBLIC_URL + project.image} alt={project.title} loading="lazy" />
                  <div className="featured-card-label">
                    {project.title} — {project.tag} · {project.year}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="featured-hint">
        <div className="circle">↓</div>
        <span>Scroll to explore</span>
      </div>
    </div>
  );
};

export default ScrollShowcase;