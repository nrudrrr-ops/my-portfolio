import { useEffect } from 'react';
import './App.css';
import OggyEyes from './components/OggyEyes';
import GuessTheBrand from './components/GuessTheBrand';
import ScrollShowcase from './components/ScrollShowcase';
import AdityaBirlaInternship from './components/AdityaBirlaInternship';

function App() {
  useEffect(() => {
    // ==========================================
    // NAV HIGHLIGHT
    // ==========================================

    const navLinks = document.querySelectorAll('.topnav a');

    const sections = [
      { id: null, href: '#top' },
      { id: 'featured', href: '#featured' },
      { id: 'projects', href: '#projects' },
      { id: 'journey', href: '#journey' },
      { id: 'internship', href: '#internship' },
      { id: 'connect', href: '#connect' },
    ];

    const setActiveNav = () => {
      const scrollY = window.scrollY + 120;

      let current = '#top';

      for (const s of sections) {
        if (!s.id) continue;

        const el = document.getElementById(s.id);

        if (el && el.offsetTop <= scrollY) {
          current = s.href;
        }
      }

      navLinks.forEach((link) => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === current
        );
      });
    };

    window.addEventListener(
      'scroll',
      setActiveNav,
      { passive: true }
    );

    setActiveNav();


    // ==========================================
    // CAROUSEL
    // ==========================================

    const wrapper = document.getElementById(
      'carousel-wrapper'
    );

    const track = document.getElementById(
      'carousel-track'
    );

    const items = document.querySelectorAll(
      '.carousel-item'
    );

    const title = document.getElementById(
      'carousel-title'
    );

    const desc = document.getElementById(
      'carousel-desc'
    );

    const meta1 = document.getElementById(
      'carousel-meta1'
    );

    const meta2 = document.getElementById(
      'carousel-meta2'
    );


    let carouselCleanup = null;

    if (track && items.length > 0) {

      const PROJECTS = [
        {
          title: 'Smart Workflow System',
          desc: 'Structured workspace that turns scattered tasks into clear workflows.',
          tag: 'Process Design',
          year: '2026'
        },
        {
          title: 'QueueFlow',
          desc: 'Service operations redesigned to reduce waiting time and eliminate friction.',
          tag: 'Service Ops',
          year: '2025'
        },
        {
          title: 'Northline Identity',
          desc: 'A flexible brand system connecting business goals with visual identity.',
          tag: 'Brand Strategy',
          year: '2025'
        },
        {
          title: 'Performance Dashboard',
          desc: 'Real-time operational intelligence — making performance easier to monitor.',
          tag: 'Analytics',
          year: '2024'
        },
        {
          title: 'Make It Matter',
          desc: 'A campaign combining clear communication, visual consistency and storytelling.',
          tag: 'Marketing',
          year: '2024'
        },
        {
          title: 'Canvas Design System',
          desc: 'A reusable foundation improving consistency, collaboration and execution speed.',
          tag: 'Systems',
          year: '2024'
        },
      ];


      let currentIndex = 0;


      const updateCarousel = (index) => {

        currentIndex = index;

        items.forEach((el, i) => {

          const diff = Math.abs(
            i - index
          );

          el.classList.toggle(
            'active',
            i === index
          );


          // CENTER IMAGE
          if (i === index) {

            el.style.width = '580px';
            el.style.height = '730px';
            el.style.opacity = '1';
            el.style.filter =
              'grayscale(0%)';
            el.style.zIndex = '5';

          }


          // SIDE IMAGES
          else if (diff === 1) {

            el.style.width = '200px';
            el.style.height = '440px';
            el.style.opacity = '0.55';
            el.style.filter =
              'grayscale(30%)';
            el.style.zIndex = '3';

          }


          // OTHER IMAGES
          else {

            el.style.width = '170px';
            el.style.height = '400px';
            el.style.opacity = '0.3';
            el.style.filter =
              'grayscale(55%)';
            el.style.zIndex = '1';

          }

        });


        // CENTER ACTIVE ITEM

        const item = items[index];

        if (!item) return;

        const itemW =
          item.offsetWidth;

        const offset =
          (window.innerWidth / 2) -
          (itemW / 2) -
          item.offsetLeft;

        track.style.transform =
          `translateX(${offset}px)`;


        // TEXT

        const p =
          PROJECTS[index];

        if (title) {
          title.textContent =
            p.title;
        }

        if (desc) {
          desc.textContent =
            p.desc;
        }

        if (meta1) {
          meta1.textContent =
            p.tag + ' |';
        }

        if (meta2) {
          meta2.textContent =
            p.year;
        }

      };


      // ==========================================
      // CLICK ON CAROUSEL IMAGE
      // ==========================================

      const itemClickHandlers = [];

      items.forEach(
        (item, index) => {

          const handler = () => {
            updateCarousel(index);
          };

          item.addEventListener(
            'click',
            handler
          );

          itemClickHandlers.push({
            item,
            handler
          });

        }
      );


      // ==========================================
      // MOUSE WHEEL CAROUSEL
      // ==========================================

      const handleWheel = (e) => {

        e.preventDefault();

        if (
          e.deltaY > 0 ||
          e.deltaX > 0
        ) {

          if (
            currentIndex <
            items.length - 1
          ) {

            updateCarousel(
              currentIndex + 1
            );

          }

        } else {

          if (
            currentIndex > 0
          ) {

            updateCarousel(
              currentIndex - 1
            );

          }

        }

      };


      if (wrapper) {

        wrapper.addEventListener(
          'wheel',
          handleWheel,
          {
            passive: false
          }
        );

      }


      // ==========================================
      // RESIZE
      // ==========================================

      const handleResize = () => {
        updateCarousel(
          currentIndex
        );
      };

      window.addEventListener(
        'resize',
        handleResize
      );


      // Initial carousel

      const initialTimer =
        setTimeout(() => {
          updateCarousel(0);
        }, 50);


      // ==========================================
      // CAROUSEL CLEANUP
      // ==========================================

      carouselCleanup = () => {

        itemClickHandlers.forEach(
          ({ item, handler }) => {

            item.removeEventListener(
              'click',
              handler
            );

          }
        );


        if (wrapper) {

          wrapper.removeEventListener(
            'wheel',
            handleWheel
          );

        }


        window.removeEventListener(
          'resize',
          handleResize
        );


        clearTimeout(
          initialTimer
        );

      };

    }


    // ==========================================
    // JOURNEY CARDS
    // ==========================================

    const handleJourneyClick = (e) => {

      const card =
        e.target.closest(
          '.journey-card'
        );

      if (!card) return;


      document
        .querySelectorAll(
          '.journey-card.is-active'
        )
        .forEach((el) => {

          if (el !== card) {
            el.classList.remove(
              'is-active'
            );
          }

        });


      card.classList.toggle(
        'is-active'
      );

    };


    document.addEventListener(
      'click',
      handleJourneyClick
    );


    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {

      window.removeEventListener(
        'scroll',
        setActiveNav
      );

      document.removeEventListener(
        'click',
        handleJourneyClick
      );

      if (carouselCleanup) {
        carouselCleanup();
      }

    };

  }, []);


  return (
    <div>

      <canvas id="kevin-canvas"></canvas>


      <div
        className="frame"
        id="top"
      >


        {/* ==========================================
            NAVIGATION
        ========================================== */}

        <header className="topbar">

          <div className="nav-pill">

            <a
              href="#top"
              className="brand"
            >
              <span className="mark">
                ✦
              </span>

              <span className="brand-name">
                Nitesh Singh
              </span>
            </a>


            <span className="nav-divider"></span>


            <nav
              className="topnav"
              aria-label="Primary"
            >

              <a
                href="#top"
                className="active"
                aria-label="Home"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M3 11.5 12 4l9 7.5" />
                  <path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9" />
                </svg>
              </a>


              <a
                href="#featured"
                aria-label="Featured"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M3 7a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 21 7v10a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 17z" />
                  <path d="M3 7h18" />
                </svg>
              </a>


              <a
                href="#projects"
                aria-label="Work"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M3 7a1.5 1.5 0 0 1 1.5-1.5H9l2 2h8.5A1.5 1.5 0 0 1 21 9v8.5A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
                </svg>
              </a>


              <a
                href="#journey"
                aria-label="Journey"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M4 19V8.5a3.5 3.5 0 0 1 3.5-3.5h9A3.5 3.5 0 0 1 20 8.5V19" />
                  <path d="M4 14h16" />
                  <path d="M9 5v9M15 5v4" />
                </svg>
              </a>


              <a
                href="#internship"
                aria-label="Internship"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M3 7a1.5 1.5 0 0 1 1.5-1.5H9l2 2h8.5A1.5 1.5 0 0 1 21 9v8.5A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
                </svg>
              </a>


              <a
                href="#connect"
                aria-label="Connect"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M4 12a8 8 0 1 1 3 6.2L4 20l1.3-3.6A7.96 7.96 0 0 1 4 12Z" />
                </svg>
              </a>


              <a
                href="mailto:v.nitttesh@gmail.com"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24">
                  <rect
                    x="3.5"
                    y="5.5"
                    width="17"
                    height="13"
                    rx="1.5"
                  />
                  <path d="M4 6.5 12 13l8-6.5" />
                </svg>
              </a>

            </nav>

          </div>


          <a
            href="mailto:v.nitttesh@gmail.com"
            className="cta-pill"
          >
            Let's talk ↗
          </a>

        </header>


        {/* ==========================================
            HERO
        ========================================== */}

        <section
          className="hero"
          style={{
            position: 'relative'
          }}
        >

          <article className="card">

            <div className="card-top">
              <span className="glyph">
                ✦
              </span>

              About Me
            </div>


            <div className="avatar-wrap">

              <div className="halo"></div>

              <div className="avatar">

                <img
                  src={
                    process.env.PUBLIC_URL +
                    '/profile.jpg'
                  }

                  alt="Profile"

                  onError={(e) => {
                    e.target.style.display =
                      'none';

                    e.target.parentElement.classList.add(
                      'fallback'
                    );
                  }}
                />

                <span className="avatar-initials">
                  NS
                </span>

              </div>

            </div>


            <div className="intro">

              <p className="greet">
                I'm
              </p>

              <h2 className="name">
                Nitesh
                <br />
                Singh
              </h2>

              <div className="contact">

                <span>
                  v.nitttesh@gmail.com
                </span>

                <span className="icon">
                  ✉
                </span>

              </div>

            </div>


            <div className="badge">

              <svg
                className="ring"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >

                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="#16151a"
                />

                <defs>

                  <path
                    id="badgeCircle"
                    d="M50,50 m0,-38 a38,38 0 1,1 -0.1,0"
                  />

                </defs>

                <text
                  fill="#fff"
                  fontFamily="Inter, sans-serif"
                  fontSize="7"
                  letterSpacing="2"
                  fontWeight="600"
                >

                  <textPath
                    href="#badgeCircle"
                    startOffset="0%"
                  >
                    MY DESIGN PORTFOLIO • 2025 •
                  </textPath>

                </text>

              </svg>

              <div className="dot"></div>

            </div>

          </article>


          {/* OGGY */}

          <div className="hero-character">
            <OggyEyes />
          </div>


          <div className="title-area">

            <div className="title-top">

              <h1 className="display">
                Operations
                <br />
                &amp; Design
                <span className="accent"></span>
              </h1>


              <p className="tagline">

                Currently pursuing an MBA in Operations Management while exploring
                my passion for digital design, branding, and user experience.
                I believe great design and efficient systems work together to solve
                meaningful, real-world problems.

              </p>


              <div className="skills-row">

                <span>
                  Operations Management
                </span>

                <span>
                  Process Improvement
                </span>

                <span>
                  UI / UX Design
                </span>

                <span>
                  Branding
                </span>

              </div>

            </div>


            <div className="stats-row">

              <div className="stat">
                <strong>
                  MBA
                </strong>

                <span>
                  Operations Management
                </span>
              </div>


              <div className="stat">
                <strong>
                  UX
                </strong>

                <span>
                  Human-centered design
                </span>
              </div>


              <div className="stat">
                <strong>
                  ∞
                </strong>

                <span>
                  Curiosity to improve systems
                </span>
              </div>

            </div>

          </div>

        </section>


        {/* ==========================================
            PROJECTS
        ========================================== */}

        <section
          className="projects-section"
          id="projects"
        >

          <div className="projects-heading">

            <div>

              <span className="section-kicker">
                Selected work / Operations × Design
              </span>

              <h2>
                Ideas built with
                <br />
                logic &amp; creativity
                <span>.</span>
              </h2>

            </div>


            <p>
              Projects that combine structured thinking,
              efficient processes and human-centered design.
            </p>

          </div>


          <div className="projects-grid">

            {[
              {
                num: '01',
                color: 'project-violet',
                cat: 'Process design',
                year: '2026',
                title: 'Smart Workflow System',
                desc: 'A structured workspace that turns scattered tasks into clear and efficient workflows.'
              },
              {
                num: '02',
                color: 'project-amber',
                cat: 'Service operations',
                year: '2025',
                title: 'QueueFlow',
                desc: 'A service concept designed to reduce waiting time and improve customer experience.'
              },
              {
                num: '03',
                color: 'project-mint',
                cat: 'Brand strategy',
                year: '2025',
                title: 'Northline Identity',
                desc: 'A flexible brand system connecting business goals with a memorable visual identity.'
              },
              {
                num: '04',
                color: 'project-blue',
                cat: 'Operations analytics',
                year: '2024',
                title: 'Performance Dashboard',
                desc: 'A dashboard that makes operational performance easier to monitor and improve.'
              },
              {
                num: '05',
                color: 'project-coral',
                cat: 'Marketing design',
                year: '2024',
                title: 'Make It Matter',
                desc: 'A campaign combining clear communication, consistency and visual storytelling.'
              },
              {
                num: '06',
                color: 'project-cream',
                cat: 'Systems thinking',
                year: '2024',
                title: 'Canvas Design System',
                desc: 'A reusable system improving consistency, collaboration and execution speed.'
              }
            ].map((p) => (

              <article
                key={p.num}
                className={`project-card ${p.color}`}
                tabIndex="0"
              >

                <div className="project-visual">

                  <span className="project-number">
                    {p.num}
                  </span>

                </div>


                <div className="project-copy">

                  <div className="project-meta">

                    <span>
                      {p.cat}
                    </span>

                    <span>
                      {p.year}
                    </span>

                  </div>


                  <h3>
                    {p.title}
                  </h3>


                  <p>
                    {p.desc}
                  </p>


                  <button
                    type="button"
                    className="project-link"
                  >
                    View case study
                    <span>↗</span>
                  </button>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* ==========================================
            FEATURED / SCROLL SHOWCASE
        ========================================== */}

        <section id="featured">

          <ScrollShowcase />

        </section>


        {/* ==========================================
            JOURNEY
        ========================================== */}

        <section
          className="journey-section"
          id="journey"
        >

          <div className="journey-heading">

            <h2>
              The path behind
              <span>
                the portfolio
              </span>.
            </h2>

            <p>
              From MBA classrooms to design tools — here's how operations
              thinking and a love for good interfaces have grown side by side.
            </p>

          </div>


          <div className="journey-stack">

            {[
              {
                org: 'MBA Program',
                year: '2025 – Present',
                title: 'Operations Management Student',
                desc: 'Studying supply chain design, process optimization and decision analytics.'
              },
              {
                org: 'Company Name',
                year: '2025',
                title: 'Operations Intern',
                desc: 'Improved process metrics and redesigned workflows to save time.'
              },
              {
                org: 'Freelance Client',
                year: '2024',
                title: 'UI/UX Design Collaborator',
                desc: 'Designed user-friendly interfaces and clear brand systems.'
              },
              {
                org: 'Undergrad College',
                year: '2021 – 2024',
                title: "Bachelor's Degree",
                desc: 'Built a solid foundation in analytical thinking and problem-solving.'
              },
              {
                org: 'First Milestone',
                year: '2021',
                title: 'Started the Journey',
                desc: 'Began exploring the intersection of business logic and visual design.'
              }
            ].map((j, i) => (

              <article
                key={i}
                className="journey-card"
                tabIndex="0"
              >

                <div className="journey-card-top">

                  <span className="journey-org">
                    {j.org}
                  </span>

                  <span>
                    {j.year}
                  </span>

                </div>


                <h3>
                  {j.title}
                </h3>


                <p>
                  {j.desc}
                </p>

              </article>

            ))}

          </div>

        </section>


        {/* ==========================================
            ADITYA BIRLA INTERNSHIP
        ========================================== */}

        <section
          id="internship"
          className="internship-wrapper"
        >

          <AdityaBirlaInternship />

        </section>


        {/* ==========================================
            GUESS THE BRAND — full-screen standalone game
        ========================================== */}

        <GuessTheBrand />


        {/* ==========================================
            CONNECT
        ========================================== */}

        <section className="footer-grid">

          <div
            className="connect-card"
            id="connect"
          >

            <div
              className="connect-icon-circle"
              aria-hidden="true"
            >
              📨
            </div>


            <h2>
              Let's Connect
            </h2>


            <p>
              Reach out through any of these channels
            </p>


            <div className="connect-links">

              <a
                href="https://linkedin.com/in/nitesh-singh"
                target="_blank"
                rel="noopener noreferrer"
                className="connect-link-item"
              >

                <span className="connect-link-icon connect-linkedin">
                  in
                </span>

                <span className="connect-link-label">
                  LinkedIn
                </span>

                <span className="connect-link-sub">
                  Connect ↗
                </span>

              </a>


              <a
                href="https://instagram.com/nitesh_singh"
                target="_blank"
                rel="noopener noreferrer"
                className="connect-link-item"
              >

                <span className="connect-link-icon connect-instagram">
                  📷
                </span>

                <span className="connect-link-label">
                  Instagram
                </span>

                <span className="connect-link-sub">
                  Follow ↗
                </span>

              </a>


              <a
                href="mailto:v.nitttesh@gmail.com"
                className="connect-link-item"
              >

                <span className="connect-link-icon connect-email">
                  ✉
                </span>

                <span className="connect-link-label">
                  Email
                </span>

                <span className="connect-link-sub">
                  Send Mail ↗
                </span>

              </a>

            </div>


            <p className="connect-quote">
              "Great ideas start with simple conversations."
            </p>


            <a
              href="mailto:v.nitttesh@gmail.com"
              className="connect-cta"
            >
              Let's Talk →
            </a>

          </div>

        </section>


        {/* ==========================================
            SITE FOOTER
        ========================================== */}

        <footer className="site-footer">

          <div className="site-footer-icons">

            <a
              href="https://linkedin.com/in/nitesh-singh"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-icon"
              aria-label="LinkedIn"
            >

              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
              >

                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.7c0-1.6-.03-3.65-2.22-3.65-2.23 0-2.57 1.74-2.57 3.54V23h-4V8z" />

              </svg>

            </a>


            <a
              href="https://instagram.com/nitesh_singh"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-icon"
              aria-label="Instagram"
            >

              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
              >

                <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.35-1.26-.4-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.97.4-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.59 1.8c.46-.16 1.26-.35 2.43-.4C9.29 1.34 9.67 1.33 12 1.33m0-2c-3.26 0-3.67.01-4.95.07-1.28.06-2.15.26-2.91.56a6.9 6.9 0 0 0-2.5 1.63A6.9 6.9 0 0 0 .01 4.14c-.3.76-.5 1.63-.56 2.91C-.61 8.33-.62 8.74-.62 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91a6.9 6.9 0 0 0 1.63 2.5 6.9 6.9 0 0 0 2.5 1.63c.76.3 1.63.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a6.9 6.9 0 0 0 2.5-1.63 6.9 6.9 0 0 0 1.63-2.5c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a6.9 6.9 0 0 0-1.63-2.5A6.9 6.9 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67-.01 15.26-.02 12-.02z" />

                <path d="M12 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />

              </svg>

            </a>


            <a
              href="mailto:v.nitttesh@gmail.com"
              className="site-footer-icon"
              aria-label="Email"
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >

                <rect
                  x="3.5"
                  y="5.5"
                  width="17"
                  height="13"
                  rx="1.5"
                />

                <path d="M4 6.5 12 13l8-6.5" />

              </svg>

            </a>


            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-icon"
              aria-label="GitHub"
            >

              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
              >

                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.68 1.25 3.34.95.1-.75.4-1.25.73-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />

              </svg>

            </a>

          </div>


          <p className="site-footer-copy">
            © 2026 Nitesh Singh
            &nbsp;•&nbsp;
            All rights reserved
          </p>


          <p className="site-footer-built">
            Built with ❤️, curiosity &amp; consistency
          </p>

        </footer>


      </div>

    </div>
  );
}

export default App;