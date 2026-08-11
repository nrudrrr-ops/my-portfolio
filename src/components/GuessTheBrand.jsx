import { useState, useMemo, useCallback, useEffect } from 'react';
import './GuessTheBrand.css';
import CurtainCloth from './CurtainCloth';

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

function CharacterReaction({ state }) {
  const images = {
    thinking: process.env.PUBLIC_URL + '/images/thinking.gif',
    correct: process.env.PUBLIC_URL + '/images/correct.gif',
    wrong: process.env.PUBLIC_URL + '/images/wrong.gif'
  };

  return (
    <div className="gtb-character-box">
      <img
        className="gtb-character-gif"
        src={images[state]}
        alt={
          state === 'correct'
            ? 'Happy reaction'
            : state === 'wrong'
              ? 'Wrong answer reaction'
              : 'Thinking reaction'
        }
      />
    </div>
  );
}


/* =========================================================
   FOOTER
========================================================= */

function GuessBrandFooter() {
  return (
    <footer className="gtb-footer gtb-footer-v2" id="connect">

      <div className="gtb-footer-v2-left">

        <h3 className="gtb-footer-v2-name">
          Nitesh Singh
        </h3>

        <p className="gtb-footer-v2-tagline">
          A little Logic. A lot of Creativity.
          <br />
          <span className="gtb-footer-v2-chai-line">
            Just enough <span className="gtb-footer-v2-chai-word">Chai</span>.
          </span>
        </p>

        <p className="gtb-footer-v2-copy">
          &copy; 2026 Nitesh Singh. All rights reserved.
        </p>

      </div>


      <div className="gtb-footer-v2-icons">

        <a
          href="mailto:v.nitttesh@gmail.com"
          aria-label="Email"
          className="gtb-footer-v2-icon"
        >
          <svg viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M4 7l8 6 8-6" />
          </svg>
        </a>

        <a
          href="https://www.linkedin.com/in/nitesh-singh-758650315"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="gtb-footer-v2-icon"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3.5a1.96 1.96 0 100 3.92 1.96 1.96 0 000-3.92zM20.5 20h-3.38v-5.9c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V20H9.53V8.5h3.24v1.57h.05c.45-.85 1.56-1.75 3.21-1.75 3.43 0 4.06 2.26 4.06 5.2V20z" />
          </svg>
        </a>

        <a
          href="#"
          aria-label="GitHub"
          className="gtb-footer-v2-icon"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.36-3.37-1.36-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.11 2.91.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.32 9.32 0 015 0c1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.21 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.26 10.26 0 0022 12.25C22 6.58 17.52 2 12 2z" />
          </svg>
        </a>

        <a
          href="#"
          aria-label="X"
          className="gtb-footer-v2-icon"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M17.53 3H21l-7.5 8.57L22 21h-6.53l-5.11-6.19L4.5 21H1l8.02-9.17L2 3h6.68l4.62 5.62L17.53 3zm-1.15 16h1.8L7.7 5H5.8l10.58 14z" />
          </svg>
        </a>

      </div>


      <div className="gtb-footer-v2-image">

        <div className="gtb-footer-v2-roof-crop">
          <img
            src={process.env.PUBLIC_URL + '/images/roof.jpeg'}
            alt=""
            className="gtb-footer-v2-roof"
          />
        </div>

        <div className="gtb-footer-v2-curtain">
          <CurtainCloth compact />
        </div>

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

  // Character starts in thinking mode for every new question.
  const [characterState, setCharacterState] = useState('thinking');


  const current =
    QUESTIONS[order[pointer]];

  const isCorrect =
    answered &&
    selected === current.answer;

  const maxScore =
    QUESTIONS.length *
    POINTS_PER_CORRECT;


  /* =====================================================
     CHARACTER REACTION RESET
     Correct / wrong reaction plays, then returns to thinking.
  ===================================================== */

  useEffect(() => {
    if (
      characterState !== 'correct' &&
      characterState !== 'wrong'
    ) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setCharacterState('thinking');
    }, 1800);

    return () => clearTimeout(timer);
  }, [characterState]);


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

      setCharacterState('correct');

      setScore(
        (s) =>
          s + POINTS_PER_CORRECT
      );

      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 1200);

    } else {

      setCharacterState('wrong');

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

      setCharacterState('thinking');

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

      setCharacterState('thinking');

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

            {/* REACTION CHARACTER */}

            <div className="gtb-logo-box">

              <CharacterReaction
                state={characterState}
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
      
      <GuessBrandFooter />

    </section>

  );
}