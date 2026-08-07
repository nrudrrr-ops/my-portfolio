import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const HorizontalGallery = () => {
  const projects = [
    {
      id: 1,
      title: 'Smart Workflow System',
      tag: 'Process Design',
      year: '2026',
      color: '#9089f2',
      image: '/images/1.jpeg',
    },
    {
      id: 2,
      title: 'QueueFlow',
      tag: 'Service Ops',
      year: '2025',
      color: '#ff9f5a',
      image: '/images/2.jpeg',
    },
    {
      id: 3,
      title: 'Northline Identity',
      tag: 'Brand Strategy',
      year: '2025',
      color: '#4ade80',
      image: '/images/3.jpeg',
    },
    {
      id: 4,
      title: 'Performance Dashboard',
      tag: 'Analytics',
      year: '2024',
      color: '#60a5fa',
      image: '/images/4.jpeg',
    },
    {
      id: 5,
      title: 'Make It Matter',
      tag: 'Marketing',
      year: '2024',
      color: '#f97316',
      image: '/images/5.jpeg',
    },
    {
      id: 6,
      title: 'Canvas Design System',
      tag: 'Systems',
      year: '2024',
      color: '#ec4899',
      image: '/images/6.jpeg',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const velocityRef = useRef(0);
  const targetIndexRef = useRef(0);
  const wheelTimeoutRef = useRef(null);
  const animationFrameRef = useRef(null);

  const getCardDimensions = useCallback(() => {
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth < 960;

    if (isMobile) {
      return {
        centerWidth: windowWidth * 0.80,
        sideWidth: windowWidth * 0.25,
        gap: 15,
        scale: {
          center: 1,
          side: 0.55,
        },
      };
    }

    if (isTablet) {
      return {
        centerWidth: windowWidth * 0.68,
        sideWidth: windowWidth * 0.10,
        gap: 25,
        scale: {
          center: 1,
          side: 0.55,
        },
      };
    }

    return {
      centerWidth: windowWidth * 0.70,
      sideWidth: windowWidth * 0.08,
      gap: 40,
      scale: {
        center: 1,
        side: 0.50,
      },
    };
  }, [windowWidth]);

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();

      const direction = e.deltaY > 0 ? 1 : -1;
      const scrollSensitivity = 0.5;

      velocityRef.current += direction * scrollSensitivity;
      velocityRef.current = Math.max(-3, Math.min(3, velocityRef.current));

      targetIndexRef.current = Math.max(
        0,
        Math.min(projects.length - 1, targetIndexRef.current + direction * scrollSensitivity)
      );

      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      const applyMomentum = () => {
        if (Math.abs(velocityRef.current) > 0.01) {
          velocityRef.current *= 0.92;
          targetIndexRef.current = Math.max(
            0,
            Math.min(
              projects.length - 1,
              targetIndexRef.current + velocityRef.current * 0.1
            )
          );

          setActiveIndex(Math.round(targetIndexRef.current));
          animationFrameRef.current = requestAnimationFrame(applyMomentum);
        } else {
          velocityRef.current = 0;
          setActiveIndex(Math.round(targetIndexRef.current));
          targetIndexRef.current = Math.round(targetIndexRef.current);
        }
      };

      setActiveIndex(Math.round(targetIndexRef.current));
      wheelTimeoutRef.current = setTimeout(applyMomentum, 50);
    },
    [projects.length]
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = document.querySelector('[data-gallery-container]');
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  useEffect(() => {
    return () => {
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const renderCard = (project, index) => {
    const dimensions = getCardDimensions();
    const distance = Math.abs(index - activeIndex);

    const scale = distance === 0 ? dimensions.scale.center : Math.max(0.5, dimensions.scale.side - distance * 0.08);
    const opacity = distance === 0 ? 1 : Math.max(0.35, 0.75 - distance * 0.2);
    const zIndex = distance === 0 ? 10 : Math.max(1, 5 - distance);

    const xOffset = index < activeIndex ? -1 : index > activeIndex ? 1 : 0;

    return (
      <motion.div
        key={project.id}
        layout
        animate={{
          scale,
          opacity,
          zIndex,
          x: xOffset * dimensions.gap * 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 60,
          mass: 1,
        }}
        className="gallery-card-wrapper"
        style={{
          width: index === activeIndex ? dimensions.centerWidth : dimensions.sideWidth,
          minWidth: index === activeIndex ? dimensions.centerWidth : dimensions.sideWidth,
        }}
      >
        <motion.div
          className="gallery-card"
          initial={false}
          whileHover={index === activeIndex ? { y: -4 } : {}}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <div className="gallery-card-image">
            <img src={project.image} alt={project.title} loading="lazy" />
          </div>

          <motion.div
            className="gallery-card-content"
            animate={{
              opacity: distance === 0 ? 1 : 0.5,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            <h3>{project.title}</h3>
            <div className="gallery-card-meta">
              <span className="tag">{project.tag}</span>
              <span className="year">{project.year}</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="gallery-wrapper">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .gallery-wrapper {
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(135deg, #b30000 0%, #5a0000 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #fff;
          overflow: hidden;
          position: relative;
        }

        .gallery-heading {
          text-align: center;
          margin-bottom: 60px;
          z-index: 100;
          max-width: 600px;
        }

        .gallery-heading h1 {
          font-size: clamp(32px, 6vw, 56px);
          font-weight: 800;
          margin: 0 0 16px;
          line-height: 1.2;
        }

        .gallery-heading p {
          font-size: clamp(14px, 2vw, 16px);
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          line-height: 1.6;
        }

        [data-gallery-container] {
          width: 100%;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: grab;
          user-select: none;
          overflow: visible;
        }

        [data-gallery-container]:active {
          cursor: grabbing;
        }

        .gallery-track {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(12px, 3vw, 40px);
          position: relative;
          width: 100%;
        }

        .gallery-card-wrapper {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: width 0.3s ease;
        }

        .gallery-card {
          width: 100%;
          aspect-ratio: 4/5;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          background: #000;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          transition: box-shadow 0.3s ease;
        }

        .gallery-card:hover {
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
        }

        .gallery-card-image {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
        }

        .gallery-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .gallery-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          color: #fff;
          pointer-events: none;
        }

        .gallery-card-content h3 {
          font-size: clamp(14px, 2vw, 20px);
          font-weight: 700;
          margin: 0 0 8px;
          line-height: 1.3;
        }

        .gallery-card-meta {
          display: flex;
          gap: 12px;
          align-items: center;
          font-size: clamp(11px, 1.5vw, 13px);
          color: rgba(255, 255, 255, 0.7);
        }

        .gallery-card-meta .tag {
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .gallery-card-meta .year {
          opacity: 0.7;
        }

        .gallery-hint {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
          animation: fade-in-out 3s ease-in-out infinite;
          z-index: 50;
        }

        @keyframes fade-in-out {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        @media (max-width: 640px) {
          .gallery-wrapper {
            padding: 30px 16px;
            min-height: auto;
          }

          .gallery-heading {
            margin-bottom: 40px;
          }

          [data-gallery-container] {
            height: 380px;
          }

          .gallery-card-content {
            padding: 16px;
          }

          .gallery-hint {
            bottom: 20px;
            font-size: 12px;
          }
        }

        @media (max-width: 960px) {
          .gallery-wrapper {
            padding: 30px 20px;
          }

          .gallery-heading {
            margin-bottom: 50px;
          }

          [data-gallery-container] {
            height: 420px;
          }
        }
      `}</style>

      <div className="gallery-heading">
        <h1>Featured Work</h1>
        <p>Scroll to explore selected projects combining operations thinking and human-centered design.</p>
      </div>

      <div data-gallery-container>
        <div className="gallery-track">
          {projects.map((project, index) => renderCard(project, index))}
        </div>
      </div>

      <div className="gallery-hint">
        ↑↓ Scroll to browse
      </div>
    </div>
  );
};

export default HorizontalGallery;