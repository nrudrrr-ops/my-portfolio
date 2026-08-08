import { useEffect } from 'react';
import './App.css';
import OggyEyes from './components/OggyEyes';
import GuessTheBrand from './components/GuessTheBrand';
import ScrollShowcase from './components/ScrollShowcase';

function App() {
  useEffect(() => {
    // NAV HIGHLIGHT
    const navLinks = document.querySelectorAll('.topnav a');
    const sections = [
      { id: null,       href: '#'         },
      { id: 'featured', href: '#featured' },
      { id: 'projects', href: '#projects' },
      { id: 'journey',  href: '#journey'  },
      { id: 'connect',  href: '#connect'  },
    ];
    const setActiveNav = () => {
      const scrollY = window.scrollY + 120;
      let current = '#';
      for (const s of sections) {
        if (!s.id) continue;
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollY) current = s.href;
      }
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === current);
      });
    };
    window.addEventListener('scroll', setActiveNav, { passive: true });
    setActiveNav();
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        if (link.getAttribute('href') === '#') e.preventDefault();
      });
    });

    // CAROUSEL
    const wrapper = document.getElementById('carousel-wrapper');
    const track   = document.getElementById('carousel-track');
    const items   = document.querySelectorAll('.carousel-item');
    const title   = document.getElementById('carousel-title');
    const desc    = document.getElementById('carousel-desc');
    const meta1   = document.getElementById('carousel-meta1');
    const meta2   = document.getElementById('carousel-meta2');

    if (track && items.length > 0) {
      const PROJECTS = [
        { title: 'Smart Workflow System', desc: 'Structured workspace that turns scattered tasks into clear workflows.', tag: 'Process Design', year: '2026' },
        { title: 'QueueFlow', desc: 'Service operations redesigned to reduce waiting time and eliminate friction.', tag: 'Service Ops', year: '2025' },
        { title: 'Northline Identity', desc: 'A flexible brand system connecting business goals with visual identity.', tag: 'Brand Strategy', year: '2025' },
        { title: 'Performance Dashboard', desc: 'Real-time operational intelligence — making performance easier to monitor.', tag: 'Analytics', year: '2024' },
        { title: 'Make It Matter', desc: 'A campaign combining clear communication, visual consistency and storytelling.', tag: 'Marketing', year: '2024' },
        { title: 'Canvas Design System', desc: 'A reusable foundation improving consistency, collaboration and execution speed.', tag: 'Systems', year: '2024' },
      ];

      let currentIndex = 0;

      const updateCarousel = (index) => {
        currentIndex = index;
        items.forEach((el, i) => {
          const diff = Math.abs(i - index);
          el.classList.toggle('active', i === index);
          if (i === index) {
            el.style.width   = '580px';
            el.style.height  = '730px';
            el.style.opacity = '1';
            el.style.filter  = 'grayscale(0%)';
            el.style.zIndex  = '5';
          } else if (diff === 1) {
            el.style.width   = '200px';
            el.style.height  = '440px';
            el.style.opacity = '0.55';
            el.style.filter  = 'grayscale(30%)';
            el.style.zIndex  = '3';
          } else {
            el.style.width   = '170px';
            el.style.height  = '400px';
            el.style.opacity = '0.3';
            el.style.filter  = 'grayscale(55%)';
            el.style.zIndex  = '1';
          }
        });

        // Center active item
        const item   = items[index];
        const itemW  = item.offsetWidth;
        const offset = (window.innerWidth / 2) - (itemW / 2) - item.offsetLeft;
        track.style.transform = `translateX(${offset}px)`;

        const p = PROJECTS[index];
        title.textContent = p.title;
        desc.textContent  = p.desc;
        meta1.textContent = p.tag + ' |';
        meta2.textContent = p.year;
      };

      items.forEach((item, index) => {
        item.addEventListener('click', () => updateCarousel(index));
      });

      if (wrapper) {
        wrapper.addEventListener('wheel', (e) => {
          e.preventDefault();
          if (e.deltaY > 0 || e.deltaX > 0) {
            if (currentIndex < items.length - 1) updateCarousel(currentIndex + 1);
          } else {
            if (currentIndex > 0) updateCarousel(currentIndex - 1);
          }
        }, { passive: false });
      }

      window.addEventListener('resize', () => updateCarousel(currentIndex));
      setTimeout(() => updateCarousel(0), 50);
    }

    // JOURNEY CARDS
    document.addEventListener('click', e => {
      const card = e.target.closest('.journey-card');
      if (!card) return;
      document.querySelectorAll('.journey-card.is-active').forEach(el => {
        if (el !== card) el.classList.remove('is-active');
      });
      card.classList.toggle('is-active');
    });

    return () => {
      window.removeEventListener('scroll', setActiveNav);
    };
  }, []);

  return (
    <div>
      <canvas id="kevin-canvas"></canvas>

      <div className="frame">

        {/* NAVIGATION */}
        <header className="topbar">
          <div className="nav-pill">
            <a href="#" className="brand">
              <span className="mark">✦</span>
              <span className="brand-name">Nitesh Singh</span>
            </a>
            <span className="nav-divider"></span>
            <nav className="topnav" aria-label="Primary">
              <a href="#" className="active" aria-label="Home">
                <svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9"/></svg>
              </a>
              <a href="#featured" aria-label="Featured">
                <svg viewBox="0 0 24 24"><path d="M3 7a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 21 7v10a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 17z"/><path d="M3 7h18"/></svg>
              </a>
              <a href="#projects" aria-label="Work">
                <svg viewBox="0 0 24 24"><path d="M3 7a1.5 1.5 0 0 1 1.5-1.5H9l2 2h8.5A1.5 1.5 0 0 1 21 9v8.5A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z"/></svg>
              </a>
              <a href="#journey" aria-label="Journey">
                <svg viewBox="0 0 24 24"><path d="M4 19V8.5a3.5 3.5 0 0 1 3.5-3.5h9A3.5 3.5 0 0 1 20 8.5V19"/><path d="M4 14h16"/><path d="M9 5v9M15 5v4"/></svg>
              </a>
              <a href="#internship" aria-label="Internship">
                <svg viewBox="0 0 24 24"><path d="M3 7a1.5 1.5 0 0 1 1.5-1.5H9l2 2h8.5A1.5 1.5 0 0 1 21 9v8.5A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z"/></svg>
              </a>
              <a href="#connect" aria-label="Connect">
                <svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 1 3 6.2L4 20l1.3-3.6A7.96 7.96 0 0 1 4 12Z"/></svg>
              </a>
              <a href="mailto:v.nitttesh@gmail.com" aria-label="Email">
                <svg viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="M4 6.5 12 13l8-6.5"/></svg>
              </a>
            </nav>
          </div>
          <a href="mailto:v.nitttesh@gmail.com" className="cta-pill">Let's talk ↗</a>
        </header>

        {/* HERO */}
        <section className="hero" style={{ position: 'relative' }}>
          <article className="card">
            <div className="card-top"><span className="glyph">✦</span> About Me</div>
            <div className="avatar-wrap">
              <div className="halo"></div>
              <div className="avatar">
                <img src={process.env.PUBLIC_URL + '/profile.jpg'} alt="Profile" />
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('fallback');
                  }}
                />
                <span className="avatar-initials">NS</span>
              </div>
            </div>
            <div className="intro">
              <p className="greet">I'm</p>
              <h2 className="name">Nitesh<br/>Singh</h2>
              <div className="contact">
                <span>v.nitttesh@gmail.com</span>
                <span className="icon">✉</span>
              </div>
            </div>
            <div className="badge">
              <svg className="ring" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" fill="#16151a"/>
                <defs>
                  <path id="badgeCircle" d="M50,50 m0,-38 a38,38 0 1,1 -0.1,0" />
                </defs>
                <text fill="#fff" fontFamily="Inter, sans-serif" fontSize="7" letterSpacing="2" fontWeight="600">
                  <textPath href="#badgeCircle" startOffset="0%">MY DESIGN PORTFOLIO • 2025 •</textPath>
                </text>
              </svg>
              <div className="dot"></div>
            </div>
          </article>

          {/* OGGY — cursor-tracking eyes character.
              IMPORTANT: this component's image is sized via HEIGHT (its CSS
              uses height:100%/width:auto internally), so we set an explicit
              HEIGHT here and leave width as 'auto'. Setting width instead of
              height (or leaving height as 'auto') breaks the sizing chain and
              causes the image to render at its full natural pixel size. */}
          <div className="hero-character">
  <OggyEyes />
</div>

          <div className="title-area">
            <div className="title-top">
              <h1 className="display">Operations<br/>&amp; Design<span className="accent"></span></h1>
              <p className="tagline">
                Currently pursuing an MBA in Operations Management while exploring
                my passion for digital design, branding, and user experience.
                I believe great design and efficient systems work together to solve
                meaningful, real-world problems.
              </p>
              <div className="skills-row">
                <span>Operations Management</span>
                <span>Process Improvement</span>
                <span>UI / UX Design</span>
                <span>Branding</span>
              </div>
            </div>
            <div className="stats-row">
              <div className="stat"><strong>MBA</strong><span>Operations Management</span></div>
              <div className="stat"><strong>UX</strong><span>Human-centered design</span></div>
              <div className="stat"><strong>∞</strong><span>Curiosity to improve systems</span></div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="projects-section" id="projects">
          <div className="projects-heading">
            <div>
              <span className="section-kicker">Selected work / Operations × Design</span>
              <h2>Ideas built with<br/>logic &amp; creativity<span>.</span></h2>
            </div>
            <p>Projects that combine structured thinking, efficient processes and human-centered design.</p>
          </div>
          <div className="projects-grid">
            {[
              { num:'01', color:'project-violet', cat:'Process design',       year:'2026', title:'Smart Workflow System',  desc:'A structured workspace that turns scattered tasks into clear and efficient workflows.' },
              { num:'02', color:'project-amber',  cat:'Service operations',   year:'2025', title:'QueueFlow',              desc:'A service concept designed to reduce waiting time and improve customer experience.' },
              { num:'03', color:'project-mint',   cat:'Brand strategy',       year:'2025', title:'Northline Identity',     desc:'A flexible brand system connecting business goals with a memorable visual identity.' },
              { num:'04', color:'project-blue',   cat:'Operations analytics', year:'2024', title:'Performance Dashboard',  desc:'A dashboard that makes operational performance easier to monitor and improve.' },
              { num:'05', color:'project-coral',  cat:'Marketing design',     year:'2024', title:'Make It Matter',         desc:'A campaign combining clear communication, consistency and visual storytelling.' },
              { num:'06', color:'project-cream',  cat:'Systems thinking',     year:'2024', title:'Canvas Design System',   desc:'A reusable system improving consistency, collaboration and execution speed.' },
            ].map(p => (
              <article key={p.num} className={`project-card ${p.color}`} tabIndex="0">
                <div className="project-visual"><span className="project-number">{p.num}</span></div>
                <div className="project-copy">
                  <div className="project-meta"><span>{p.cat}</span><span>{p.year}</span></div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <a href="#" className="project-link">View case study <span>↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="featured">
  <ScrollShowcase />
</section>

        {/* JOURNEY */}
        <section className="journey-section" id="journey">
          <div className="journey-heading">
            <h2>The path behind <span>the portfolio</span>.</h2>
            <p>From MBA classrooms to design tools — here's how operations thinking and a love for good interfaces have grown side by side.</p>
          </div>
          <div className="journey-stack">
            {[
              { org:'MBA Program',      year:'2025 – Present', title:'Operations Management Student', desc:'Studying supply chain design, process optimization and decision analytics.' },
              { org:'Company Name',     year:'2025',           title:'Operations Intern',             desc:'Improved process metrics and redesigned workflows to save time.' },
              { org:'Freelance Client', year:'2024',           title:'UI/UX Design Collaborator',     desc:'Designed user-friendly interfaces and clear brand systems.' },
              { org:'Undergrad College',year:'2021 – 2024',    title:"Bachelor's Degree",             desc:'Built a solid foundation in analytical thinking and problem-solving.' },
              { org:'First Milestone',  year:'2021',           title:'Started the Journey',           desc:'Began exploring the intersection of business logic and visual design.' },
            ].map((j, i) => (
              <article key={i} className="journey-card" tabIndex="0">
                <div className="journey-card-top">
                  <span className="journey-org">{j.org}</span>
                  <span>{j.year}</span>
                </div>
                <h3>{j.title}</h3>
                <p>{j.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* INTERNSHIP — Aditya Birla */}
        <section className="internship-section" id="internship">
          <div className="internship-heading">
            <div className="internship-logo-corner">
              <div className="internship-logo-mark"><div></div><div></div><div></div><div></div></div>
              <span className="internship-logo-caption">ADITYA BIRLA GROUP</span>
            </div>
            <span className="internship-pill"><span className="dot"></span> INTERNSHIP EXPERIENCE</span>
            <h2>Inside <span>Aditya Birla</span></h2>
            <p>Learning. Analyzing. Improving.</p>
          </div>

          <div className="internship-main-row">
            {/* Laptop mockup */}
            <div className="internship-laptop">
              <div className="internship-screen">
                <div className="internship-screen-inner">
                  <div className="internship-sap-topbar">
                    <span className="internship-sap-badge">SAP</span>
                    <span className="internship-sap-title">Display Document: General Ledger View</span>
                  </div>
                  <div className="internship-sap-icons">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <div className="internship-ledger-grid">
                    <div className="internship-ledger-table">
                      <div className="internship-ledger-row"><span>Doc No.</span><span>Line</span><span>Account</span></div>
                      <div className="internship-ledger-row"><span>1200236</span><span>10</span><span>Travel Expense</span></div>
                      <div className="internship-ledger-row"><span>1200235</span><span>20</span><span>Vendor Payable</span></div>
                      <div className="internship-ledger-row"><span>2200890</span><span>10</span><span>Fuel Charges</span></div>
                      <div className="internship-ledger-row"><span>3300123</span><span>30</span><span>Freight Inward</span></div>
                      <div className="internship-ledger-row"><span>2200109</span><span>10</span><span>Repairs Maint.</span></div>
                      <div className="internship-ledger-row"><span>2200820</span><span>10</span><span>Consumables</span></div>
                    </div>
                    <div>
                      <div className="internship-chart-box" style={{ marginBottom: 6 }}>
                        <div className="internship-chart-label">Monthly Spend Analysis</div>
                        <div className="internship-donut"></div>
                      </div>
                      <div className="internship-chart-box">
                        <div className="internship-chart-label">Spend by Vendor</div>
                        <div className="internship-bars">
                          <i style={{ height: "70%", background: "#2fa8e0" }}></i>
                          <i style={{ height: "45%", background: "#6be0a8" }}></i>
                          <i style={{ height: "90%", background: "#f0a03c" }}></i>
                          <i style={{ height: "30%", background: "#c9c9d8" }}></i>
                          <i style={{ height: "55%", background: "#c81e1e" }}></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="internship-keyboard-base"></div>
            </div>

            {/* Info */}
            <div className="internship-info-col">
              <span className="internship-role-pill">💼 Finance Intern</span>
              <div className="internship-company">Aditya Birla Group</div>
              <p className="internship-desc">
                Working closely with the finance team to support daily operations,
                analysis, and reporting using SAP, Excel and other digital tools.
              </p>
              <div className="internship-meta-box">
                <div className="internship-meta-row">📅 May 2026 – July 2026</div>
                <div className="internship-meta-row">📍 Cement Division</div>
              </div>
            </div>

            {/* Feature grid */}
            <div className="internship-feature-grid">
              <div className="internship-feature-card">
                <div className="internship-feature-icon">📄</div>
                <h4>GST Reconciliation</h4>
                <p>3-way match, GSTR-1 vs 2B validation</p>
              </div>
              <div className="internship-feature-card">
                <div className="internship-feature-icon">SAP</div>
                <h4>SAP S/4HANA</h4>
                <p>Daily reports, FBL51, GR/IR tracking</p>
              </div>
              <div className="internship-feature-card">
                <div className="internship-feature-icon">📊</div>
                <h4>Excel Analytics</h4>
                <p>Pivot dashboards, variance analysis</p>
              </div>
              <div className="internship-feature-card">
                <div className="internship-feature-icon">🏭</div>
                <h4>Cement Operations</h4>
                <p>Fuel reports, cost analysis, tracking</p>
              </div>
            </div>
          </div>

          {/* Project tiles */}
          <div className="internship-projects">
            <div className="internship-projects-heading">
              <h3>Key Projects &amp; Tasks</h3>
              <span className="internship-view-all">View All →</span>
            </div>
            <div className="internship-tiles">
              <div className="internship-tile">
                <div className="top"><span className="internship-tile-icon">📄</span><h4>GST Reconciliation</h4></div>
                <p>Reconciled vendor data with GSTR-1 and GSTR-2B. Identified mismatches and resolved filing issues.</p>
                <div className="internship-thumb chart">
                  <i style={{ height: "40%", background: "#c81e1e" }}></i>
                  <i style={{ height: "70%", background: "#f0a03c" }}></i>
                  <i style={{ height: "55%", background: "#2fa8e0" }}></i>
                  <i style={{ height: "85%", background: "#6be0a8" }}></i>
                  <i style={{ height: "30%", background: "#c9c9d8" }}></i>
                </div>
              </div>
              <div className="internship-tile">
                <div className="top"><span className="internship-tile-icon">📈</span><h4>Fuel Cost Analytics</h4></div>
                <p>Prepared daily fuel reports for TPP. Analyzed cost variance and created pivot dashboards for insights.</p>
                <div className="internship-thumb chart">
                  <i style={{ height: "60%", background: "#2fa8e0" }}></i>
                  <i style={{ height: "80%", background: "#c81e1e" }}></i>
                  <i style={{ height: "40%", background: "#f0a03c" }}></i>
                  <i style={{ height: "65%", background: "#6be0a8" }}></i>
                  <i style={{ height: "50%", background: "#c9c9d8" }}></i>
                </div>
              </div>
              <div className="internship-tile">
                <div className="top"><span className="internship-tile-icon">👥</span><h4>Vendor Reports</h4></div>
                <p>Generated vendor-wise reports using SAP (FBL51) and analyzed outstanding &amp; payment status.</p>
                <div className="internship-thumb people">
                  <span></span><span></span><span></span>
                </div>
              </div>
              <div className="internship-tile">
                <div className="top"><span className="internship-tile-icon">📋</span><h4>Process Tracking</h4></div>
                <p>Tracked procurement to payment process. Ensured timely GRN, invoice &amp; payment closure.</p>
                <div className="internship-thumb"></div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="internship-stats-bar">
            <div className="internship-stat">
              <div className="internship-stat-icon">📅</div>
              <div><strong>30+</strong><span>Days Of Internship</span></div>
            </div>
            <div className="internship-stat">
              <div className="internship-stat-icon">📋</div>
              <div><strong>15+</strong><span>SAP Reports Generated</span></div>
            </div>
            <div className="internship-stat">
              <div className="internship-stat-icon">✅</div>
              <div><strong>20+</strong><span>GST Checks Completed</span></div>
            </div>
            <div className="internship-stat">
              <div className="internship-stat-icon">⏱️</div>
              <div><strong>100+</strong><span>Hours Hands-on Learning</span></div>
            </div>
          </div>
        </section>

        {/* FOOTER GRID — Guess The Brand + Connect, side by side */}
        <section className="footer-grid">
          <GuessTheBrand />

          <div className="connect-card" id="connect">
            <div className="connect-icon-circle" aria-hidden="true">📨</div>
            <h2>Let's Connect</h2>
            <p>Reach out through any of these channels</p>

            <div className="connect-links">
              <a href="https://linkedin.com/in/nitesh-singh" target="_blank" rel="noopener noreferrer" className="connect-link-item">
                <span className="connect-link-icon connect-linkedin">in</span>
                <span className="connect-link-label">LinkedIn</span>
                <span className="connect-link-sub">Connect ↗</span>
              </a>
              <a href="https://instagram.com/nitesh_singh" target="_blank" rel="noopener noreferrer" className="connect-link-item">
                <span className="connect-link-icon connect-instagram">📷</span>
                <span className="connect-link-label">Instagram</span>
                <span className="connect-link-sub">Follow ↗</span>
              </a>
              <a href="mailto:v.nitttesh@gmail.com" className="connect-link-item">
                <span className="connect-link-icon connect-email">✉</span>
                <span className="connect-link-label">Email</span>
                <span className="connect-link-sub">Send Mail ↗</span>
              </a>
            </div>

            <p className="connect-quote">"Great ideas start with simple conversations."</p>

            <a href="mailto:v.nitttesh@gmail.com" className="connect-cta">Let's Talk →</a>
          </div>
        </section>

        {/* SITE FOOTER — icons + copyright */}
        <footer className="site-footer">
          <div className="site-footer-icons">
            <a href="https://linkedin.com/in/nitesh-singh" target="_blank" rel="noopener noreferrer" className="site-footer-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.7c0-1.6-.03-3.65-2.22-3.65-2.23 0-2.57 1.74-2.57 3.54V23h-4V8z"/></svg>
            </a>
            <a href="https://instagram.com/nitesh_singh" target="_blank" rel="noopener noreferrer" className="site-footer-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.35-1.26-.4-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.97.4-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.59 1.8c.46-.16 1.26-.35 2.43-.4C9.29 1.34 9.67 1.33 12 1.33m0-2c-3.26 0-3.67.01-4.95.07-1.28.06-2.15.26-2.91.56a6.9 6.9 0 0 0-2.5 1.63A6.9 6.9 0 0 0 .01 4.14c-.3.76-.5 1.63-.56 2.91C-.61 8.33-.62 8.74-.62 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91a6.9 6.9 0 0 0 1.63 2.5 6.9 6.9 0 0 0 2.5 1.63c.76.3 1.63.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a6.9 6.9 0 0 0 2.5-1.63 6.9 6.9 0 0 0 1.63-2.5c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a6.9 6.9 0 0 0-1.63-2.5A6.9 6.9 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67-.01 15.26-.02 12-.02z"/><path d="M12 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>
            </a>
            <a href="mailto:v.nitttesh@gmail.com" className="site-footer-icon" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="M4 6.5 12 13l8-6.5"/></svg>
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="site-footer-icon" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.68 1.25 3.34.95.1-.75.4-1.25.73-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
            </a>
          </div>
          <p className="site-footer-copy">© 2026 Nitesh Singh &nbsp;•&nbsp; All rights reserved</p>
          <p className="site-footer-built">Built with ❤️, curiosity &amp; consistency</p>
        </footer>

      </div>
    </div>
  );
}

export default App;