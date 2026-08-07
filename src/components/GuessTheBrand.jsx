import { useState, useMemo, useCallback } from 'react';
import './GuessTheBrand.css';

/* ---------- QUESTION BANK ----------
   Add more questions here anytime — the game automatically adapts
   (progress counter, shuffle, and final score all use this array's length). */
const QUESTIONS = [
  { tagline: 'Daag Achhe Hain', answer: 'Surf Excel', options: ['Tide', 'Surf Excel', 'Ariel', 'Rin'] },
  { tagline: 'Har Ghar Kuch Kehta Hai', answer: 'Asian Paints', options: ['Berger Paints', 'Nerolac', 'Asian Paints', 'Dulux'] },
  { tagline: 'Taste The Thunder', answer: 'Thums Up', options: ['Pepsi', 'Sprite', 'Thums Up', 'Mountain Dew'] },
  { tagline: 'Yeh Dil Maange More', answer: 'Pepsi', options: ['Coca-Cola', 'Pepsi', 'Fanta', 'Limca'] },
  { tagline: 'The Complete Man', answer: 'Raymond', options: ['Van Heusen', 'Raymond', 'Peter England', 'Allen Solly'] },
  { tagline: 'Just Do It', answer: 'Nike', options: ['Adidas', 'Puma', 'Reebok', 'Nike'] },
  { tagline: 'Think Different', answer: 'Apple', options: ['Samsung', 'Apple', 'Sony', 'Dell'] },
  { tagline: 'Open Happiness', answer: 'Coca-Cola', options: ['Pepsi', 'Sprite', 'Coca-Cola', 'Fanta'] },
];

const POINTS_PER_CORRECT = 10;

/* Fisher–Yates shuffle — returns a new shuffled array of question indices */
function shuffleOrder(length) {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* Small confetti burst — plain CSS, no external library needed */
function Confetti() {
  const pieces = useMemo(() => (
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.25,
      duration: 0.9 + Math.random() * 0.6,
      rotate: Math.random() * 360,
      color: ['#b1a4f8', '#9089f2', '#eec3f3', '#fff5f2', '#ff8a75'][i % 5],
    }))
  ), []);

  return (
    <div className="gtb-confetti" aria-hidden="true">
      {pieces.map(p => (
        <span
          key={p.id}
          className="gtb-confetti-piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function GuessTheBrand() {
  const [order, setOrder] = useState(() => shuffleOrder(QUESTIONS.length));
  const [pointer, setPointer] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const current = QUESTIONS[order[pointer]];
  const isCorrect = answered && selected === current.answer;
  const maxScore = QUESTIONS.length * POINTS_PER_CORRECT;

  const handleSelect = useCallback((option) => {
    if (answered) return;
    setSelected(option);
  }, [answered]);

  const handleSubmit = useCallback(() => {
    if (!selected || answered) return;
    setAnswered(true);
    if (selected === current.answer) {
      setScore(s => s + POINTS_PER_CORRECT);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1200);
    }
  }, [selected, answered, current]);

  const handleNext = useCallback(() => {
    if (pointer + 1 < QUESTIONS.length) {
      setPointer(p => p + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setCompleted(true);
    }
  }, [pointer]);

  const handlePlayAgain = useCallback(() => {
    setOrder(shuffleOrder(QUESTIONS.length));
    setPointer(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setCompleted(false);
  }, []);

  const handleOptionKeyDown = (e, option) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(option);
    }
  };

  return (
    <div className="gtb-card">
      {showConfetti && <Confetti />}

      <div className="gtb-header">
        <div className="gtb-icon-badge" aria-hidden="true">🧠</div>
        <div className="gtb-header-text">
          <h2 className="gtb-title">Guess The Brand</h2>
          <p className="gtb-subtitle">Can you identify the brand from its famous tagline?</p>
        </div>
        <span className="gtb-score-badge">🏆 Score: {score}</span>
      </div>
      <div className="gtb-divider" />

        {!completed ? (
          <>
            <div className="gtb-meta-row">
              <span className="gtb-progress">Question {pointer + 1} / {QUESTIONS.length}</span>
            </div>

            <div className="gtb-tagline-box">
              <span className="gtb-quote-mark" aria-hidden="true">“</span>
              {current.tagline}
              <span className="gtb-quote-mark" aria-hidden="true">”</span>
            </div>

            <div className="gtb-options" role="radiogroup" aria-label="Answer options">
              {current.options.map(option => {
                const isSelected = selected === option;
                const revealCorrect = answered && option === current.answer;
                const revealWrong = answered && isSelected && option !== current.answer;
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    className={[
                      'gtb-option',
                      isSelected ? 'is-selected' : '',
                      revealCorrect ? 'is-reveal-correct' : '',
                      revealWrong ? 'is-reveal-wrong' : '',
                    ].join(' ').trim()}
                    onClick={() => handleSelect(option)}
                    onKeyDown={(e) => handleOptionKeyDown(e, option)}
                    disabled={answered}
                  >
                    <span className="gtb-option-dot" aria-hidden="true"></span>
                    {option}
                  </button>
                );
              })}
            </div>

            {!answered ? (
              <button
                type="button"
                className="gtb-submit-btn"
                onClick={handleSubmit}
                disabled={!selected}
              >
                Check Answer
              </button>
            ) : (
              <div className="gtb-feedback" role="status" aria-live="polite">
                {isCorrect ? (
                  <>
                    <p className="gtb-feedback-title gtb-feedback-correct">🎉 Correct!</p>
                    <p className="gtb-feedback-text">
                      "{current.tagline}" is the famous tagline of <strong>{current.answer}</strong>.
                    </p>
                    <p className="gtb-feedback-points">+{POINTS_PER_CORRECT} Points</p>
                  </>
                ) : (
                  <>
                    <p className="gtb-feedback-title gtb-feedback-wrong">❌ Wrong Answer</p>
                    <p className="gtb-feedback-text">
                      Correct Answer: <strong>{current.answer}</strong>
                    </p>
                  </>
                )}
                <button type="button" className="gtb-next-btn" onClick={handleNext}>
                  {pointer + 1 < QUESTIONS.length ? 'Next Question →' : 'See Results →'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="gtb-complete" role="status" aria-live="polite">
            <p className="gtb-complete-title">🏆 Brand Master!</p>
            <p className="gtb-complete-score">You scored {score} / {maxScore}</p>
            <button type="button" className="gtb-submit-btn" onClick={handlePlayAgain}>
              Play Again
            </button>
          </div>
        )}
    </div>
  );
}