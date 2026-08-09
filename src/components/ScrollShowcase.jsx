import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "SMART WORKFLOW SYSTEM",
    tag: "PROCESS DESIGN",
    year: "2026",
    image: "/images/1.jpeg",
  },
  {
    id: 2,
    title: "QUEUEFLOW",
    tag: "SERVICE OPERATIONS",
    year: "2025",
    image: "/images/2s.jpeg",
  },
  {
    id: 3,
    title: "NORTHLINE IDENTITY",
    tag: "BRAND STRATEGY",
    year: "2025",
    image: "/images/3.jpeg",
  },
  {
    id: 4,
    title: "PERFORMANCE DASHBOARD",
    tag: "ANALYTICS",
    year: "2024",
    image: "/images/4.jpeg",
  },
  {
    id: 5,
    title: "MAKE IT MATTER",
    tag: "MARKETING",
    year: "2024",
    image: "/images/5.jpeg",
  },
  {
    id: 6,
    title: "CANVAS DESIGN SYSTEM",
    tag: "SYSTEMS",
    year: "2024",
    image: "/images/6.jpeg",
  },
];

const ScrollShowcase = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const total = cards.length;

      /*
      =====================================================
      YOUR EXISTING CUSTOM SIZES
      =====================================================
      */

      const SMALL_W = 180;
      const SMALL_H = 265;

      const LARGE_W = 400;
      const LARGE_H = 540;

      const GAP = 28;

      /*
      =====================================================
      SCROLL SPEED
      =====================================================
      How many viewport-heights of physical scrolling it takes
      to go through all the images. LOWER = FASTER scroll feel,
      HIGHER = SLOWER (more scrolling needed per image change).
      Was 5 (felt slow) — lowered to 2.2.
      */

      const SCROLL_DISTANCE_MULTIPLIER = 2.2;

      /*
      =====================================================
      POSITION ALL CARDS
      =====================================================
      */

      const positionCards = (
        activeIndex,
        animate = false
      ) => {
        cards.forEach((card, index) => {
          let relative = index - activeIndex;

          /*
          Circular positioning
          */

          if (relative > total / 2) {
            relative -= total;
          }

          if (relative < -total / 2) {
            relative += total;
          }

          /*
          =================================================
          CENTER IMAGE
          =================================================
          */

          if (Math.abs(relative) < 0.5) {
            const props = {
              x: 0,
              y: 0,
              width: LARGE_W,
              height: LARGE_H,
              scale: 1,
              opacity: 1,
              zIndex: 30,
            };

            if (animate) {
              gsap.to(card, {
                ...props,
                duration: 0.55,
                ease: "power3.inOut",
                overwrite: true,
              });
            } else {
              gsap.set(card, props);
            }

            return;
          }

          /*
          =================================================
          SIDE IMAGES
          =================================================
          */

          const distance = Math.abs(relative);

          let x;

          /*
          LEFT
          */

          if (relative < 0) {
            x =
              -(LARGE_W / 2) -
              GAP -
              SMALL_W / 2 -
              (distance - 1) *
                (SMALL_W + GAP);
          }

          /*
          RIGHT
          */

          else {
            x =
              LARGE_W / 2 +
              GAP +
              SMALL_W / 2 +
              (distance - 1) *
                (SMALL_W + GAP);
          }

          const props = {
            x,
            y: 0,
            width: SMALL_W,
            height: SMALL_H,
            scale: 1,
            opacity:
              distance > 2
                ? 0.35
                : 0.78,
            zIndex: 10 - distance,
          };

          if (animate) {
            gsap.to(card, {
              ...props,
              duration: 0.55,
              ease: "power3.inOut",
              overwrite: true,
            });
          } else {
            gsap.set(card, props);
          }
        });
      };

      /*
      =====================================================
      INITIAL STATE
      =====================================================
      */

      activeIndexRef.current = 0;

      positionCards(0, false);

      /*
      =====================================================
      SCROLL TRIGGER
      =====================================================

      IMPORTANT:

      Section starts
           ↓
      IMAGE 1 CENTER
           ↓ scroll
      IMAGE 2 CENTER
           ↓ scroll
      IMAGE 3 CENTER
           ↓ scroll
      IMAGE 4 CENTER
           ↓ scroll
      IMAGE 5 CENTER
           ↓ scroll
      IMAGE 6 CENTER
           ↓
      NEXT SECTION
      =====================================================
      */

      const trigger = ScrollTrigger.create({
        trigger: section,

        start: "top top",

        /*
        5 transitions:

        1 → 2
        2 → 3
        3 → 4
        4 → 5
        5 → 6
        */

        end: () =>
          `+=${window.innerHeight * SCROLL_DISTANCE_MULTIPLIER}`,

        /*
        THIS IS THE IMPORTANT PART.
        Gallery remains on screen while
        images are changing.
        */

        pin: section,

        pinSpacing: true,

        scrub: true,

        anticipatePin: 1,

        invalidateOnRefresh: true,

        /*
        Snap to each image.
        */

        snap: {
          snapTo:
            1 / (total - 1),

          duration: {
            min: 0.25,
            max: 0.55,
          },

          delay: 0.05,

          ease: "power2.out",
        },

        onUpdate: (self) => {
          /*
          Convert scroll progress
          into image number.

          0.00 = Image 1
          0.20 = Image 2
          0.40 = Image 3
          0.60 = Image 4
          0.80 = Image 5
          1.00 = Image 6
          */

          const rawIndex =
            self.progress *
            (total - 1);

          /*
          Make a real center image.
          */

          const nextIndex =
            Math.round(rawIndex);

          /*
          Only animate when
          center image changes.
          */

          if (
            nextIndex !==
            activeIndexRef.current
          ) {
            activeIndexRef.current =
              nextIndex;

            positionCards(
              nextIndex,
              true
            );
          }
        },
      });

      /*
      =====================================================
      RESIZE
      =====================================================
      */

      const handleResize = () => {
        positionCards(
          activeIndexRef.current,
          false
        );

        ScrollTrigger.refresh();
      };

      window.addEventListener(
        "resize",
        handleResize
      );

      /*
      =====================================================
      CLEANUP
      =====================================================
      */

      return () => {
        window.removeEventListener(
          "resize",
          handleResize
        );

        trigger.kill();

        gsap.killTweensOf(cards);
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="oryzo-scroll-section"
    >
      <div
        ref={stageRef}
        className="oryzo-stage"
      >

        {/* =====================================
            TOP LEFT NAME
        ====================================== */}

        <div className="oryzo-name">
          NITESH SINGH
        </div>


        {/* =====================================
            GALLERY
        ====================================== */}

        <div className="oryzo-gallery">

          {/* ===================================
              CENTER DOTTED BORDER
          ==================================== */}

          <div className="oryzo-active-border" />


          {/* ===================================
              TEXT ABOVE LEFT IMAGE
          ==================================== */}

          <div className="oryzo-text">

            <div className="oryzo-text-small">
              SO PORTABLE,
            </div>

            <div className="oryzo-text-large">
              it’s wearable
            </div>

          </div>


          {/* ===================================
              PROJECT IMAGES
          ==================================== */}

          {PROJECTS.map(
            (project, index) => (
              <div
                key={project.id}

                ref={(element) => {
                  cardsRef.current[index] =
                    element;
                }}

                className="oryzo-card"
              >

                <img
                  src={
                    process.env.PUBLIC_URL +
                    project.image
                  }

                  alt={project.title}

                  draggable="false"

                  onError={(event) => {
                    event.currentTarget.src =
                      process.env.PUBLIC_URL +
                      "/images/1.jpeg";
                  }}
                />

              </div>
            )
          )}

        </div>


        {/* =====================================
            SCROLL INDICATOR
        ====================================== */}

        <div className="oryzo-scroll">

          <div className="oryzo-scroll-circle">
            ↓
          </div>

          <span>
            SCROLL TO CONTINUE
          </span>

        </div>

      </div>


      {/* =====================================
          INLINE CSS
      ====================================== */}

      <style>{`

        /* =====================================
           MAIN SECTION
        ====================================== */

        .oryzo-scroll-section {
          position: relative;

          width: 100vw;

          /*
          IMPORTANT:

          Section itself is only one viewport.
          GSAP creates the pin spacing for
          the 5 image transitions.
          */

          height: 100vh;

          margin-left:
            calc(50% - 50vw);

          background: transparent;
        }


        /* =====================================
           FULL SCREEN STAGE
        ====================================== */

        .oryzo-stage {
          position: relative;

          width: 100vw;

          height: 100vh;

          min-height: 680px;

          overflow: hidden;

          background: transparent;

          color: #fff5f2;
        }


        /* =====================================
           NAME
        ====================================== */

        .oryzo-name {
          position: absolute;

          top: 32px;

          left: 44px;

          z-index: 100;

          font-family:
            "Poppins",
            sans-serif;

          font-size: 1.35rem;

          font-weight: 700;

          line-height: 1;

          letter-spacing: -0.04em;

          color: #fff5f2;
        }


        /* =====================================
           GALLERY
        ====================================== */

        .oryzo-gallery {
          position: absolute;

          inset: 0;

          width: 100%;

          height: 100%;

          pointer-events: none;
        }


        /* =====================================
           IMAGE CARD
        ====================================== */

        .oryzo-card {
          position: absolute;

          left: 50%;

          top: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          overflow: hidden;

          border-radius: 3px;

          box-sizing: border-box;

          background: #111;

          will-change:
            transform,
            width,
            height,
            opacity;
        }


        /* =====================================
           IMAGE
        ====================================== */

        .oryzo-card img {
          display: block;

          width: 100%;

          height: 100%;

          object-fit: cover;

          object-position: center;

          user-select: none;

          -webkit-user-drag: none;
        }


        /* =====================================
           CENTER DOTTED BORDER
        ====================================== */

        .oryzo-active-border {
          position: absolute;

          left: 50%;

          top: 50%;

          width: 418px;

          height: 558px;

          transform:
            translate(
              -50%,
              -50%
            );

          box-sizing: border-box;

          border:
            2px dashed
            rgba(
              255,
              245,
              242,
              0.9
            );

          z-index: 50;

          pointer-events: none;
        }


        /* =====================================
           LEFT TEXT
        ====================================== */

        .oryzo-text {
          position: absolute;

          left: 50px;

          top:
            calc(
              50% - 205px
            );

          z-index: 60;

          width: 420px;

          text-align: left;

          color: #fff5f2;

          pointer-events: none;
        }


        /* =====================================
           SMALL TEXT
        ====================================== */

        .oryzo-text-small {
          font-family:
            "Inter",
            sans-serif;

          font-size: 1rem;

          font-weight: 600;

          line-height: 1.1;

          margin-bottom: 4px;

          color: #fff5f2;
        }


        /* =====================================
           LARGE TEXT
        ====================================== */

        .oryzo-text-large {
          font-family:
            "Poppins",
            sans-serif;

          font-size: 2.7rem;

          font-weight: 600;

          line-height: 0.95;

          letter-spacing:
            -0.055em;

          color: #fff5f2;

          white-space: nowrap;
        }


        /* =====================================
           SCROLL INDICATOR
        ====================================== */

        .oryzo-scroll {
          position: absolute;

          left: 50%;

          bottom: 30px;

          transform:
            translateX(-50%);

          z-index: 100;

          display: flex;

          align-items: center;

          gap: 12px;

          font-family:
            "Inter",
            sans-serif;

          font-size: 0.68rem;

          font-weight: 500;

          letter-spacing:
            0.12em;

          white-space: nowrap;

          color:
            rgba(
              255,
              245,
              242,
              0.9
            );
        }


        /* =====================================
           SCROLL CIRCLE
        ====================================== */

        .oryzo-scroll-circle {
          width: 34px;

          height: 34px;

          display: flex;

          align-items: center;

          justify-content: center;

          border:
            1px solid
            rgba(
              255,
              245,
              242,
              0.75
            );

          border-radius: 50%;

          font-size: 1.15rem;

          line-height: 1;

          animation:
            oryzo-arrow
            1.8s
            ease-in-out
            infinite;
        }


        /* =====================================
           ARROW
        ====================================== */

        @keyframes oryzo-arrow {

          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(5px);
          }

        }


        /* =====================================
           LARGE SCREEN
        ====================================== */

        @media (min-width: 1500px) {

          .oryzo-name {
            top: 34px;

            left: 44px;

            font-size: 1.4rem;
          }

          .oryzo-text {
            left: 50px;

            top:
              calc(
                50% - 205px
              );
          }

        }


        /* =====================================
           TABLET
        ====================================== */

        @media (max-width: 1200px) {

          .oryzo-text {
            left: 35px;

            top:
              calc(
                50% - 190px
              );

            width: 300px;
          }

          .oryzo-text-small {
            font-size: 0.9rem;
          }

          .oryzo-text-large {
            font-size: 2.35rem;
          }

        }


        /* =====================================
           MOBILE
        ====================================== */

        @media (max-width: 768px) {

          .oryzo-scroll-section {
            height: 100vh;
          }

          .oryzo-stage {
            min-height: 600px;
          }

          .oryzo-name {
            top: 22px;

            left: 20px;

            font-size: 1rem;
          }

          .oryzo-active-border {
            width: 310px;

            height: 450px;
          }

          .oryzo-text {
            left: 20px;

            top: 105px;

            width: 250px;
          }

          .oryzo-text-small {
            font-size: 0.7rem;
          }

          .oryzo-text-large {
            font-size: 1.6rem;
          }

          .oryzo-scroll {
            bottom: 18px;

            font-size: 0.55rem;
          }

          .oryzo-scroll-circle {
            width: 29px;

            height: 29px;

            font-size: 0.95rem;
          }

        }

      `}</style>

    </section>
  );
};

export default ScrollShowcase;