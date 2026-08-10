import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./OggyEyes.css";

/* ---------- EYE POSITION ----------
   xPct / yPct = position of each eye as a % of the image width/height.
   If the eyes look off-center on your image, adjust these numbers
   (0 = far left/top of image, 1 = far right/bottom of image). */
const eyes = {
  left:  { xPct: 180 / 564, yPct: 0.82 },
  right: { xPct: 369 / 564, yPct: 0.82 }
};

/* ---------- MOVEMENT RANGE ----------
   How far the pupil can drift from the eye's resting center. */
const maxDriftXPct = 0.012;
const maxDriftYPct = 0.012;

/* ---------- HIGHLIGHT MOVEMENT RATIO ----------
   The highlight moves the same direction as the pupil, but only this
   fraction of the distance, so it always stays inside the pupil. */
const highlightMoveRatio = 0.95;

export default function OggyEyes() {
  const oggyRef = useRef(null);
  const pupilLeftRef = useRef(null);
  const pupilRightRef = useRef(null);
  const highlightLeftRef = useRef(null);
  const highlightRightRef = useRef(null);

  useEffect(() => {
    const oggy = oggyRef.current;
    const pupilLeft = pupilLeftRef.current;
    const pupilRight = pupilRightRef.current;
    const highlightLeft = highlightLeftRef.current;
    const highlightRight = highlightRightRef.current;

    const quickLeftX  = gsap.quickTo(pupilLeft,  "left", { duration: 0.35, ease: "power3" });
    const quickLeftY  = gsap.quickTo(pupilLeft,  "top",  { duration: 0.35, ease: "power3" });
    const quickRightX = gsap.quickTo(pupilRight, "left", { duration: 0.35, ease: "power3" });
    const quickRightY = gsap.quickTo(pupilRight, "top",  { duration: 0.35, ease: "power3" });

    const quickHLX = gsap.quickTo(highlightLeft,  "x", { duration: 0.3, ease: "power2" });
    const quickHLY = gsap.quickTo(highlightLeft,  "y", { duration: 0.3, ease: "power2" });
    const quickHRX = gsap.quickTo(highlightRight, "x", { duration: 0.3, ease: "power2" });
    const quickHRY = gsap.quickTo(highlightRight, "y", { duration: 0.3, ease: "power2" });

    function positionPupils(mouseX, mouseY) {
      const rect = oggy.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      [
        { eye: eyes.left,  qx: quickLeftX,  qy: quickLeftY,  hx: quickHLX, hy: quickHLY },
        { eye: eyes.right, qx: quickRightX, qy: quickRightY, hx: quickHRX, hy: quickHRY }
      ].forEach(({ eye, qx, qy, hx, hy }) => {
        const centerX = rect.left + eye.xPct * w;
        const centerY = rect.top + eye.yPct * h;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const angle = Math.atan2(dy, dx);

        const maxDx = maxDriftXPct * w;
        const maxDy = maxDriftYPct * h;

        const norm = Math.min(1, Math.hypot(dx / maxDx, dy / maxDy) || 0);
        const driftX = Math.cos(angle) * maxDx * norm;
        const driftY = Math.sin(angle) * maxDy * norm;

        qx(eye.xPct * w + driftX);
        qy(eye.yPct * h + driftY);

        hx(driftX * highlightMoveRatio);
        hy(driftY * highlightMoveRatio);
      });
    }

    function initialPosition() {
      const rect = oggy.getBoundingClientRect();
      positionPupils(rect.left + rect.width / 2, rect.top + rect.height * 0.7);
    }

    const handleMouseMove = (e) => positionPupils(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        positionPupils(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", initialPosition);

    if (oggy.complete) {
      initialPosition();
    } else {
      oggy.addEventListener("load", initialPosition);
    }

    // Gentle blink every 3-6 seconds
    function blink() {
      gsap.to([pupilLeft, pupilRight], {
        scaleY: 0.05,
        duration: 0.06,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut"
      });
      blinkTimer = gsap.delayedCall(3 + Math.random() * 3, blink);
    }
    let blinkTimer = gsap.delayedCall(2, blink);

    // Cleanup when component unmounts (important in React!)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", initialPosition);
      oggy.removeEventListener("load", initialPosition);
      blinkTimer.kill();
    };
  }, []);

  return (
    <div className="oggy-stage">
      <img ref={oggyRef} className="oggy-img" src={process.env.PUBLIC_URL + '/images/oggy.png'} alt="Oggy" />
      <div ref={pupilLeftRef} className="oggy-pupil">
        <div ref={highlightLeftRef} className="oggy-highlight" />
      </div>
      <div ref={pupilRightRef} className="oggy-pupil">
        <div ref={highlightRightRef} className="oggy-highlight" />
      </div>
    </div>
  );
}
