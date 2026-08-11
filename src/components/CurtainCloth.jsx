import { useEffect, useRef, useState } from "react";
import "./CurtainCloth.css";

// Settings mapped from the reference cloth panel
const SETTINGS = {
  gravity: 0.20,
  damping: 0.990,
  precision: 5,      // constraint iterations
  stretch: 2.10,      // resistance to stretching (higher = stiffer)
  compress: 0.02,     // resistance to compressing/bunching (low = folds easily)
  touchRadius: 75,   // px, tuned equivalent of panel's 5000
  touchForce: 1.5,     // tuned equivalent of panel's 4
  chimeVolume: 0.28,
  keepInBounds: false,
};

const HINDI_CHARS = [
  "अ","आ","इ","ई","उ","ऊ","ऋ","ए","ऐ","ओ","औ",
  "क","ख","ग","घ","च","छ","ज","झ","ट","ठ","ड","ढ",
  "त","थ","द","ध","न","प","फ","ब","भ","म","य","र","ल","व","श","ष","स","ह","ॐ"
];
const DARK_PALETTE = ["#B79A5E", "#8A6A38", "#6E5530", "#4A3A22", "#9C7C46"];
const PENTATONIC = [196.0, 220.0, 246.94, 293.66, 329.63, 392.0, 440.0, 493.88];

export default function CurtainCloth({ compact = false }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const [soundOn, setSoundOn] = useState(true);
  const soundOnRef = useRef(true);

  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let W, H, DPR, COLS, ROWS;
    let points = [];
    let constraints = [];
    let rafId;
    let startTime = performance.now();

    const mouse = { x: -9999, y: -9999, active: false };

    function ensureAudio() {
      if (!audioCtxRef.current) {
        try {
          audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
          soundOnRef.current = false;
        }
      } else if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    }

    function playChime(seed, intensity) {
      const audioCtx = audioCtxRef.current;
      if (!soundOnRef.current || !audioCtx) return;
      const now = audioCtx.currentTime;
      const base = PENTATONIC[seed % PENTATONIC.length];
      const freq = base * (Math.random() < 0.5 ? 1 : 2);
      const gain = audioCtx.createGain();
      const vol = Math.min(
        SETTINGS.chimeVolume,
        SETTINGS.chimeVolume * (0.5 + intensity * 0.08)
      );
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(Math.max(vol, 0.0005), now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
      gain.connect(audioCtx.destination);
      [1, 2.01, 3.98].forEach((mult, i) => {
        const osc = audioCtx.createOscillator();
        osc.type = i === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq * mult, now);
        const og = audioCtx.createGain();
        og.gain.value = i === 0 ? 1 : 0.16 / mult;
        osc.connect(og);
        og.connect(gain);
        osc.start(now);
        osc.stop(now + 0.9);
      });
    }

    function idx(r, c) {
      return r * COLS + c;
    }

    function buildCloth() {
      points = [];
      constraints = [];

      const isSmall = W < 480;

COLS = isSmall ? 26 : 36;

/* Compact footer curtain:
   fewer rows = clean, readable cloth
   instead of overlapping/blurry characters */
ROWS = compact
  ? (isSmall ? 28 : 32)
  : (isSmall ? 26 : 34);

      const marginX = W * 0.03;
const clothW = W - marginX * 2;

/* Keep characters close, but make the curtain vertically longer */
const clothH = compact ? 120 : H * 0.86;

const restX = clothW / (COLS - 1);
const restY = clothH / (ROWS - 1);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x = marginX + c * restX;
          const y = 10 + r * restY;
          points.push({
            x, y, oldx: x, oldy: y,
            pinned: r === 0,
            anchorX: x,
            row: r, col: c,
            char: HINDI_CHARS[Math.floor(Math.random() * HINDI_CHARS.length)],
            color: DARK_PALETTE[Math.floor(Math.random() * DARK_PALETTE.length)],
            lastChime: 0,
          });
        }
      }

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const p = idx(r, c);
          if (c < COLS - 1) constraints.push({ a: p, b: idx(r, c + 1), rest: restX });
          if (r < ROWS - 1) constraints.push({ a: p, b: idx(r + 1, c), rest: restY });
        }
      }
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = stage.clientWidth;
      H = stage.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildCloth();
    }

    function step(t) {
      const g = SETTINGS.gravity;
      const damp = SETTINGS.damping;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (p.pinned) {
          p.x = p.anchorX + Math.sin(t * 0.35 + p.col * 0.4) * 2.2;
          p.y = 10;
          p.oldx = p.x; p.oldy = p.y;
          continue;
        }
        const vx = (p.x - p.oldx) * damp;
        const vy = (p.y - p.oldy) * damp;
        p.oldx = p.x; p.oldy = p.y;
        p.x += vx;
        p.y += vy + g;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < SETTINGS.touchRadius && dist > 0.001) {
            const force = (1 - dist / SETTINGS.touchRadius) * SETTINGS.touchForce;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        if (SETTINGS.keepInBounds) {
          if (p.x < 0) p.x = 0;
          if (p.x > W) p.x = W;
          if (p.y > H) p.y = H;
        }
      }

      const stretchStiff = 1 / SETTINGS.stretch;
      const compressStiff = SETTINGS.compress;

      for (let iter = 0; iter < SETTINGS.precision; iter++) {
        for (let i = 0; i < constraints.length; i++) {
          const cns = constraints[i];
          const a = points[cns.a], b = points[cns.b];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          const rest = cns.rest;
          const stiff = dist > rest ? stretchStiff : compressStiff;
          const diff = ((rest - dist) / dist) * stiff;
          const offX = dx * diff * 0.5;
          const offY = dy * diff * 0.5;
          if (!a.pinned) { a.x -= offX; a.y -= offY; }
          if (!b.pinned) { b.x += offX; b.y += offY; }
        }
      }

      for (let r = ROWS - 2; r < ROWS; r++) {
        if (r < 0) continue;
        for (let c = 0; c < COLS; c++) {
          const p = points[idx(r, c)];
          const speed = Math.hypot(p.x - p.oldx, p.y - p.oldy);
          const now = performance.now();
          if (speed > 2.6 && now - p.lastChime > 240) {
            p.lastChime = now;
            playChime(c, Math.min(speed, 12));
          }
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(90,70,40,0.18)";
      ctx.lineWidth = 0.6;
      for (let i = 0; i < constraints.length; i++) {
        const cns = constraints[i];
        const a = points[cns.a], b = points[cns.b];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (p.row === 0) continue;
        const size = compact ? 7 : 8.5;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.font = `500 ${size}px 'Mukta', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }
    }

    function frame(now) {
      const t = (now - startTime) / 1000;
      step(t);
      draw();
      rafId = requestAnimationFrame(frame);
    }

    function setMouse(x, y, active) {
      mouse.x = x; mouse.y = y; mouse.active = active;
    }

    function onMouseMove(e) {
      const rect = stage.getBoundingClientRect();
      setMouse(e.clientX - rect.left, e.clientY - rect.top, true);
    }
    function onMouseLeave() { setMouse(-9999, -9999, false); }
    function onMouseDown() { ensureAudio(); }
    function onTouchStart() { ensureAudio(); }
    function onTouchMove(e) {
      if (e.touches.length) {
        const rect = stage.getBoundingClientRect();
        const touch = e.touches[0];
        setMouse(touch.clientX - rect.left, touch.clientY - rect.top, true);
      }
    }
    function onTouchEnd() { setMouse(-9999, -9999, false); }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", resize);

    resize();
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", resize);
    };
  }, []);

  function toggleSound() {
    ensureAudioOnClick();
    setSoundOn((v) => !v);
  }

  function ensureAudioOnClick() {
    if (!audioCtxRef.current) {
      try {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        /* no-op */
      }
    } else if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }

  return (
    <div
      className={
        compact ? "curtain-stage curtain-stage--compact" : "curtain-stage"
      }
      ref={stageRef}
    >
      <canvas className="curtain-canvas" ref={canvasRef} />

      {!compact && (
        <>
          <div className="curtain-rod" />

          <div className="curtain-tag" aria-hidden="true">
            <svg viewBox="0 0 40 30" fill="none">
              <path d="M4 26 L20 6 L36 26 Z" fill="#5C4726" />
              <rect x="17" y="1" width="6" height="7" fill="#3A211A" />
              <circle cx="20" cy="1" r="2" fill="#8A6A38" />
            </svg>
            <span>भारत</span>
          </div>

          <button
            className="curtain-sound-toggle"
            onClick={toggleSound}
            aria-label="Toggle chime sound"
          >
            {soundOn ? "🔔" : "🔕"}
          </button>
        </>
      )}
    </div>
  );
}