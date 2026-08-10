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
      { id: 'projects', href: '#projects' },
      { id: 'journey', href: '#journey' },
      { id: 'internship', href: '#internship' },
      { id: 'featured', href: '#featured' },
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
                    MY DESIGN PORTFOLIO • 2026 •
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

  </div>


  <div className="projects-grid">

    {[
      {
        num: '01',
        color: 'project-violet',
        cat: 'Procurement Analytics',
        year: '2026',
        title: 'Procurement & Vendor Performance Analytics Dashboard',
        desc: 'An analytics dashboard using Excel and Power BI to evaluate procurement performance, vendor efficiency, delivery, cost and supplier ratings.',
        imageA: process.env.PUBLIC_URL + '/images/project01-a.jpeg'
      },

      {
        num: '02',
        color: 'project-amber',
        cat: 'Finance Analytics',
        year: '2026',
        title: 'Vendor Invoice Reconciliation Management Dashboard',
        desc: 'A reconciliation dashboard using Excel and Power BI to match POs, GRNs, vendor invoices and payments while identifying reconciliation exceptions.',
        imageA: process.env.PUBLIC_URL + '/images/project02-a.jpeg'
      },

      {
        num: '03',
        color: 'project-mint',
        cat: 'Web Design',
        year: '2026',
        title: 'JerseyKart – Customized Sports Jersey Platform',
        desc: 'A Framer-based website prototype for a customized sports jersey platform with jersey personalization and an online ordering experience.',
        imageA: process.env.PUBLIC_URL + '/images/project03-a.jpeg'
      },

      {
        num: '04',
        color: 'project-blue',
        cat: 'Operations Analytics',
        year: '2024',
        title: 'Performance Dashboard',
        desc: 'A dashboard concept for monitoring operational performance and turning data into actionable insights.',
        imageA: process.env.PUBLIC_URL + '/images/project04-a.jpeg'
      },

      {
        num: '05',
        color: 'project-coral',
        cat: 'Marketing Design',
        year: '2024',
        title: 'Make It Matter',
        desc: 'A marketing design concept combining clear communication, visual consistency and storytelling.',
        imageA: process.env.PUBLIC_URL + '/images/project05-a.jpeg'
      },

      {
        num: '06',
        color: 'project-cream',
        cat: 'Systems Thinking',
        year: '2024',
        title: 'Canvas Design System',
        desc: 'A reusable design system concept focused on consistency, collaboration and execution speed.',
        imageA: process.env.PUBLIC_URL + '/images/project06-a.jpeg'
      }

    ].map((p) => (

      <article
        key={p.num}
        className={`project-card ${p.color}`}
        tabIndex="0"
      >

        <div className="project-visual">

          <img
            src={p.imageA}
            alt={p.title}
            className="project-image project-image-a"
          />

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
            JOURNEY
        ========================================== */}

        <section
          className="journey-section"
          id="journey"
        >

          <div className="journey-heading">

            <h2>
              My Go-To Digital Tools
              <span>
                <></>& Skills
              </span>.
            </h2>

            <p>
              From MBA classrooms to design tools — here's how operations
              thinking and a love for good interfaces have grown side by side.
            </p>

          </div>


         <div className="journey-stack">

  {/* 01 — POWER BI */}
  <article className="journey-card" tabIndex="0">

    <div className="journey-card-top">
      <span className="journey-org">
        DATA VISUALIZATION
      </span>

      <span>
        01
      </span>
    </div>

    <h3>
      Power BI
    </h3>

    <p>
      Creating interactive dashboards and turning business data into clear,
      visual insights.
    </p>

    <div className="journey-skills">
      <span>Dashboards</span>
      <span>KPIs</span>
      <span>Insights</span>
    </div>

  </article>


  {/* 02 — CANVA */}
  <article className="journey-card" tabIndex="0">

    <div className="journey-card-top">
      <span className="journey-org">
        VISUAL DESIGN
      </span>

      <span>
        02
      </span>
    </div>

    <h3>
      Canva
    </h3>

    <p>
      Creating engaging visual designs for presentations, posters, social
      media and marketing content.
    </p>

    <div className="journey-skills">
      <span>Graphics</span>
      <span>Branding</span>
      <span>Presentations</span>
    </div>

  </article>


  {/* 03 — MICROSOFT EXCEL */}
  <article className="journey-card" tabIndex="0">

    <div className="journey-card-top">
      <span className="journey-org">
        DATA ANALYSIS
      </span>

      <span>
        03
      </span>
    </div>

    <h3>
      Microsoft Excel
    </h3>

    <p>
      Working with business data through analysis, Pivot Tables, lookups,
      reports and interactive dashboards.
    </p>

    <div className="journey-skills">
      <span>Pivot Tables</span>
      <span>Lookups</span>
      <span>Reporting</span>
    </div>

  </article>


  {/* 04 — FRAMER */}
  <article className="journey-card" tabIndex="0">

    <div className="journey-card-top">
      <span className="journey-org">
        WEB DESIGN
      </span>

      <span>
        04
      </span>
    </div>

    <h3>
      Framer
    </h3>

    <p>
      Designing modern websites and interactive portfolio experiences with
      clean layouts and smooth interactions.
    </p>

    <div className="journey-skills">
      <span>Websites</span>
      <span>UI</span>
      <span>Prototyping</span>
    </div>

  </article>


  {/* 05 — SQL */}
  <article className="journey-card" tabIndex="0">

    <div className="journey-card-top">
      <span className="journey-org">
        DATABASE
      </span>

      <span>
        05
      </span>
    </div>

    <h3>
      SQL
    </h3>

    <p>
      Working with structured data using queries, filtering, sorting and
      extracting useful information from databases.
    </p>

    <div className="journey-skills">
      <span>Queries</span>
      <span>Data</span>
      <span>Database</span>
    </div>

  </article>

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
    GALLERY / SCROLL SHOWCASE
========================================== */}

<section
  id="featured"
  className="featured-wrap"
>
  <ScrollShowcase />
</section>

{/* ==========================================
    GUESS THE BRAND — full-screen standalone game
========================================== */}

<GuessTheBrand />


      </div>

    </div>
  );
}

export default App;