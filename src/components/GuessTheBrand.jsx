import { useState, useMemo, useCallback } from 'react';
import './GuessTheBrand.css';

/* =========================================================
   QUESTION BANK
========================================================= */

const QUESTIONS = [
  {
    tagline: 'Daag Achhe Hain',
    answer: 'Surf Excel',
    slug: 'surf-excel',
    color: '#0072ce',
    options: ['Tide', 'Surf Excel', 'Ariel', 'Rin']
  },
  {
    tagline: 'Har Ghar Kuch Kehta Hai',
    answer: 'Asian Paints',
    slug: 'asian-paints',
    color: '#e30613',
    options: ['Berger Paints', 'Nerolac', 'Asian Paints', 'Dulux']
  },
  {
    tagline: 'Taste The Thunder',
    answer: 'Thums Up',
    slug: 'thums-up',
    color: '#111111',
    options: ['Pepsi', 'Sprite', 'Thums Up', 'Mountain Dew']
  },
  {
    tagline: 'Yeh Dil Maange More',
    answer: 'Pepsi',
    slug: 'pepsi',
    color: '#004b93',
    options: ['Coca-Cola', 'Pepsi', 'Fanta', 'Limca']
  },
  {
    tagline: 'The Complete Man',
    answer: 'Raymond',
    slug: 'raymond',
    color: '#7a1f2b',
    options: ['Van Heusen', 'Raymond', 'Peter England', 'Allen Solly']
  },
  {
    tagline: 'Just Do It',
    answer: 'Nike',
    slug: 'nike',
    color: '#111111',
    options: ['Adidas', 'Puma', 'Reebok', 'Nike']
  },
  {
    tagline: 'Think Different',
    answer: 'Apple',
    slug: 'apple',
    color: '#555555',
    options: ['Samsung', 'Apple', 'Sony', 'Dell']
  },
  {
    tagline: 'Open Happiness',
    answer: 'Coca-Cola',
    slug: 'coca-cola',
    color: '#e30613',
    options: ['Pepsi', 'Sprite', 'Coca-Cola', 'Fanta']
  }
];

const POINTS_PER_CORRECT = 10;
const LETTERS = ['A', 'B', 'C', 'D'];


/* =========================================================
   SHUFFLE
========================================================= */

function shuffleOrder(length) {
  const arr = Array.from({ length }, (_, i) => i);

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}


/* =========================================================
   CONFETTI
========================================================= */

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.25,
        duration: 0.9 + Math.random() * 0.6,
        rotate: Math.random() * 360,
        color: [
          '#d40000',
          '#ff5555',
          '#f5b5b5',
          '#ffffff',
          '#ff8a75'
        ][i % 5]
      })),
    []
  );

  return (
    <div
      className="gtb-confetti"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="gtb-confetti-piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`
          }}
        />
      ))}
    </div>
  );
}


/* =========================================================
   BRAND LOGO BOX
   Tries the real image at /public/images/brands/<slug>.png
   first; falls back to a colored initial box if that file
   doesn't exist yet, so the site never shows a broken image.
========================================================= */

function BrandLogoBox({ slug, color, answer }) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div
        className="gtb-logo-placeholder"
        style={{ background: `linear-gradient(160deg, ${color}, #000)` }}
      >
        {answer.charAt(0)}
      </div>
    );
  }

  return (
    <img
      className="gtb-logo-img"
      src={process.env.PUBLIC_URL + `/images/brands/${slug}.png`}
      alt={`${answer} logo`}
      onError={() => setBroken(true)}
    />
  );
}


/* =========================================================
   FOOTER
========================================================= */

function GuessBrandFooter() {
  return (
    <footer className="gtb-footer">

      <div className="gtb-footer-main">

        {/* BRAND */}

        <div className="gtb-footer-brand">

          <h3>
            NITESH SINGH
          </h3>

          <p>
            Aspiring Full Stack Developer
            <br />
            Building scalable web experiences.
          </p>

          <div className="gtb-socials">

            <a
              href="#github"
              aria-label="GitHub"
            >
              ●
            </a>

            <a
              href="#linkedin"
              aria-label="LinkedIn"
            >
              in
            </a>

            <a
              href="#twitter"
              aria-label="Twitter"
            >
              ♥
            </a>

            <a
              href="#email"
              aria-label="Email"
            >
              ✉
            </a>

          </div>

        </div>


        {/* QUICK LINKS */}

        <div className="gtb-footer-column">

          <h4>
            QUICK LINKS
          </h4>

          <span>
            About Me
          </span>

          <span>
            Skills
          </span>

          <span>
            Projects
          </span>

          <span>
            Internship
          </span>

          <span>
            Contact
          </span>

        </div>


        {/* RESOURCES */}

        <div className="gtb-footer-column">

          <h4>
            RESOURCES
          </h4>

          <span>
            GitHub
          </span>

          <span>
            LeetCode
          </span>

          <span>
            Resume
          </span>

          <span>
            Blog
          </span>

        </div>


        {/* CONTACT */}

        <div className="gtb-footer-column gtb-contact-column">

          <h4>
            CONTACT
          </h4>

          <span>
            ✉ &nbsp; niteshsingh@example.com
          </span>

          <span>
            ☎ &nbsp; +91 98765 43210
          </span>

          <span>
            📍 &nbsp; India
          </span>

        </div>


        {/* NEWSLETTER */}

        <div className="gtb-newsletter">

          <h4>
            NEWSLETTER
          </h4>

          <p>
            Stay updated with my latest
            <br />
            projects and articles.
          </p>

          <div className="gtb-email-box">

            <input
              type="email"
              placeholder="Enter your email"
            />

            <button type="button">
              Subscribe
            </button>

          </div>

        </div>

      </div>


      {/* FOOTER BOTTOM */}

      <div className="gtb-footer-bottom">

        <span>
          © 2025 Nitesh Singh. All Rights Reserved.
        </span>

        <span>
          <b>♥</b> Made with passion
        </span>

      </div>

    </footer>
  );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function GuessTheBrand() {

  const [order, setOrder] = useState(
    () => shuffleOrder(QUESTIONS.length)
  );

  const [pointer, setPointer] = useState(0);

  const [selected, setSelected] = useState(null);

  const [answered, setAnswered] = useState(false);

  const [score, setScore] = useState(0);

  const [completed, setCompleted] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);


  const current =
    QUESTIONS[order[pointer]];

  const isCorrect =
    answered &&
    selected === current.answer;

  const maxScore =
    QUESTIONS.length *
    POINTS_PER_CORRECT;


  /* =====================================================
     SELECT OPTION
  ===================================================== */

  const handleSelect = useCallback(
    (option) => {

      if (answered) return;

      setSelected(option);

    },
    [answered]
  );


  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = useCallback(() => {

    if (!selected || answered) return;

    setAnswered(true);

    if (selected === current.answer) {

      setScore(
        (s) =>
          s + POINTS_PER_CORRECT
      );

      setShowConfetti(true);

      setTimeout(() => {

        setShowConfetti(false);

      }, 1200);
    }

  }, [
    selected,
    answered,
    current
  ]);


  /* =====================================================
     NEXT QUESTION
  ===================================================== */

  const handleNext = useCallback(() => {

    if (
      pointer + 1 <
      QUESTIONS.length
    ) {

      setPointer(
        (p) => p + 1
      );

      setSelected(null);

      setAnswered(false);

    } else {

      setCompleted(true);

    }

  }, [pointer]);


  /* =====================================================
     PLAY AGAIN
  ===================================================== */

  const handlePlayAgain =
    useCallback(() => {

      setOrder(
        shuffleOrder(
          QUESTIONS.length
        )
      );

      setPointer(0);

      setSelected(null);

      setAnswered(false);

      setScore(0);

      setCompleted(false);

    }, []);


  /* =====================================================
     KEYBOARD
  ===================================================== */

  const handleOptionKeyDown =
    (e, option) => {

      if (
        e.key === 'Enter' ||
        e.key === ' '
      ) {

        e.preventDefault();

        handleSelect(option);

      }
    };


  /* =====================================================
     RETURN
  ===================================================== */

  return (

    <section className="gtb-page">

      <div className="gtb-progress">

        {showConfetti && (
          <Confetti />
        )}


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="gtb-header-v2">

          <span className="gtb-score-badge">
            🏆 &nbsp;Score: {score}
          </span>


          <div className="gtb-header-text">

            <h2 className="gtb-title">
              <span
                className="gtb-title-icon"
                aria-hidden="true"
              >
                💡
              </span>
              GUESS THE BRAND
            </h2>

            <p className="gtb-subtitle">
              Can you identify the brand
              from its famous logo?
            </p>

          </div>


          {!completed && (
            <span className="gtb-score-badge">
              📊 &nbsp;Question {pointer + 1} of {QUESTIONS.length}
            </span>
          )}

        </div>


        <div className="gtb-divider" />


        {/* =================================================
            GAME
        ================================================= */}

        {!completed ? (

          <div className="gtb-question-card">

            {/* LOGO */}

            <div className="gtb-logo-box">

              <BrandLogoBox
                slug={current.slug}
                color={current.color}
                answer={current.answer}
              />

            </div>


            <div className="gtb-question-right">

            {/* QUESTION TEXT */}

            <p className="gtb-question-text">
              <span className="gtb-question-num">
                {pointer + 1}.
              </span>
              &nbsp;Which brand is known for its "{current.tagline}" tagline?
            </p>


            {/* OPTIONS */}

            <div
              className="gtb-options"
              role="radiogroup"
              aria-label="Answer options"
            >

              {current.options.map(
                (option, optIndex) => {

                  const isSelected =
                    selected === option;

                  const revealCorrect =
                    answered &&
                    option ===
                      current.answer;

                  const revealWrong =
                    answered &&
                    isSelected &&
                    option !==
                      current.answer;

                  return (

                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={
                        isSelected
                      }
                      tabIndex={0}
                      className={[
                        'gtb-option',

                        isSelected
                          ? 'is-selected'
                          : '',

                        revealCorrect
                          ? 'is-reveal-correct'
                          : '',

                        revealWrong
                          ? 'is-reveal-wrong'
                          : ''
                      ]
                        .join(' ')
                        .trim()}

                      onClick={() =>
                        handleSelect(
                          option
                        )
                      }

                      onKeyDown={(e) =>
                        handleOptionKeyDown(
                          e,
                          option
                        )
                      }

                      disabled={answered}
                    >

                      <span
                        className="gtb-letter-badge"
                        aria-hidden="true"
                      >
                        {LETTERS[optIndex]}
                      </span>

                      <span className="gtb-option-text">
                        {option}
                      </span>

                    </button>

                  );

                }
              )}

            </div>


            {/* SUBMIT */}

            {!answered ? (

              <button
                type="button"
                className="gtb-submit-btn"
                onClick={handleSubmit}
                disabled={!selected}
              >

                Check Answer

                <span>
                  →
                </span>

              </button>

            ) : (

              <div
                className="gtb-feedback"
                role="status"
                aria-live="polite"
              >

                {isCorrect ? (

                  <>

                    <p className="gtb-feedback-title gtb-feedback-correct">
                      🎉 Correct!
                    </p>

                    <p className="gtb-feedback-text">
                      "{current.tagline}"
                      {" "}
                      is the famous
                      tagline of{" "}

                      <strong>
                        {current.answer}
                      </strong>.
                    </p>

                    <p className="gtb-feedback-points">
                      +{POINTS_PER_CORRECT}
                      {" "}
                      Points
                    </p>

                  </>

                ) : (

                  <>

                    <p className="gtb-feedback-title gtb-feedback-wrong">
                      ❌ Wrong Answer
                    </p>

                    <p className="gtb-feedback-text">
                      Correct Answer:
                      {" "}

                      <strong>
                        {current.answer}
                      </strong>
                    </p>

                  </>

                )}


                <button
                  type="button"
                  className="gtb-next-btn"
                  onClick={handleNext}
                >

                  {
                    pointer + 1 <
                    QUESTIONS.length
                      ? 'Next Question →'
                      : 'See Results →'
                  }

                </button>

              </div>

            )}

            </div>

          </div>

        ) : (

          /* =================================================
             RESULT
          ================================================= */

          <div
            className="gtb-complete"
            role="status"
            aria-live="polite"
          >

            <div className="gtb-complete-icon">
              🏆
            </div>

            <p className="gtb-complete-title">
              Brand Master!
            </p>

            <p className="gtb-complete-score">
              You scored {score} / {maxScore}
            </p>

            <button
              type="button"
              className="gtb-submit-btn"
              onClick={handlePlayAgain}
            >

              Play Again

              <span>
                ↻
              </span>

            </button>

          </div>

        )}


        {/* =================================================
            PROGRESS
        ================================================= */}

        {!completed && (

          <div className="gtb-progress-area">

            <div className="gtb-progress-track">

              {QUESTIONS.map(
                (_, index) => (

                  <div
                    key={index}
                    className={[
                      'gtb-progress-item',

                      index === pointer
                        ? 'active'
                        : '',

                      index < pointer
                        ? 'done'
                        : ''
                    ]
                      .join(' ')
                      .trim()}
                  >

                    {index + 1}

                  </div>

                )
              )}

            </div>


            <button
              type="button"
              className="gtb-new-brands"
              onClick={
                handlePlayAgain
              }
            >

              ↻ &nbsp; New Brands

            </button>

          </div>

        )}

      </div>


      {/* ===================================================
          FOOTER
      =================================================== */}

      <GuessBrandFooter />

    </section>

  );
}