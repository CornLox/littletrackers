import React, { useEffect, useRef, useCallback } from "react";
import "../../assets/sand_circle.css";

// ---- Tunables ---------------------------------------------------------------
const REST_DRAIN = 0.5; // resting level: 0 = full sand, 1 = empty (0.5 = half)
const HOVER_DRAIN = 0.8; // how far hover lowers the sand (reveals more)
const PARTICLE_DENSITY = 0.12; // texture grains per px^2
const MAX_PARTICLES = 2600;
const EASE = 0.09; // how fast the level approaches its target
const GRAVITY = 0.5; // downward acceleration while pouring (click only)
const PAD = 2; // px the canvas overfills the circle, hidden by the clip
const BASE_SAND = "#d8b783";
const SAND_COLORS = ["#e6c795", "#d9b378", "#cda668", "#e9d3a4", "#c99a5c"];

function rand(a, b) {
  return a + Math.random() * (b - a);
}

// Circular sand-filled canvas over an image background. The sand LEVEL eases
// between REST_DRAIN and HOVER_DRAIN on hover (reversible). A click "commits":
// the sand pours out under gravity to empty and the circle stays cleared.
function SandCircle({
  image,
  drainable = true, // true for circles 1-3, false for the "myth" circle
  forceDrain = false, // myth: pour out once the trio is cleared
  cleared = false, // controlled: keep it emptied across re-renders
  onCleared,
  label = "",
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  const particlesRef = useRef([]);
  const drainRef = useRef(cleared ? 1 : REST_DRAIN);
  const targetRef = useRef(cleared ? 1 : REST_DRAIN);
  const pouringRef = useRef(cleared); // committed pour (irreversible)
  const firedRef = useRef(cleared);
  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const dprRef = useRef(1);
  const cwRef = useRef(0); // canvas width in css px (incl. overfill)
  const chRef = useRef(0);

  const build = useCallback(() => {
    const cw = cwRef.current;
    const ch = chRef.current;
    if (!cw || !ch) return;
    const count = Math.min(
      MAX_PARTICLES,
      Math.floor(cw * ch * PARTICLE_DENSITY)
    );
    const ps = [];
    for (let i = 0; i < count; i++) {
      const x = rand(0, cw);
      const y = rand(0, ch);
      ps.push({
        hx: x,
        hy: y,
        x,
        y,
        r: rand(0.9, 2.0),
        color: SAND_COLORS[(Math.random() * SAND_COLORS.length) | 0],
        falling: false,
        gone: false,
        vy: 0,
        vx: 0,
      });
    }
    particlesRef.current = ps;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cw = cwRef.current;
    const ch = chRef.current;
    const dpr = dprRef.current;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);

    const fillLine = drainRef.current * ch;
    if (fillLine < ch) {
      ctx.fillStyle = BASE_SAND;
      ctx.fillRect(0, fillLine, cw, ch - fillLine);
    }

    const ps = particlesRef.current;
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      if (p.gone) continue;
      const visible = p.falling ? true : p.hy >= fillLine;
      if (!visible) continue;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.r * 2, p.r * 2);
    }
  }, []);

  const step = useCallback(() => {
    const ch = chRef.current;
    drainRef.current += (targetRef.current - drainRef.current) * EASE;
    const fillLine = drainRef.current * ch;

    let moving = false;
    if (pouringRef.current) {
      const ps = particlesRef.current;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        if (p.gone) continue;
        if (!p.falling && p.hy < fillLine) {
          p.falling = true;
          p.vy = rand(0.2, 1.4);
          p.vx = rand(-0.4, 0.4);
        }
        if (p.falling) {
          p.vy += GRAVITY;
          p.y += p.vy;
          p.x += p.vx;
          if (p.y - p.r > ch) p.gone = true;
          else moving = true;
        }
      }
    }

    draw();

    if (
      pouringRef.current &&
      !firedRef.current &&
      targetRef.current >= 1 &&
      drainRef.current > 0.985 &&
      !moving
    ) {
      firedRef.current = true;
      drainRef.current = 1;
      const ps = particlesRef.current;
      for (let i = 0; i < ps.length; i++) ps[i].gone = true; // clean reveal
      draw();
      if (onCleared) onCleared();
    }

    const settled =
      Math.abs(targetRef.current - drainRef.current) < 0.002 && !moving;
    if (settled) {
      runningRef.current = false;
      return;
    }
    rafRef.current = requestAnimationFrame(step);
  }, [draw, onCleared]);

  const ensureRunning = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    rafRef.current = requestAnimationFrame(step);
  }, [step]);

  // Size the canvas to overfill the wrapper by PAD px on every side.
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      const cw = w + PAD * 2;
      const ch = h + PAD * 2;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;
      cwRef.current = cw;
      chRef.current = ch;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      canvas.style.width = cw + "px";
      canvas.style.height = ch + "px";
      canvas.style.left = -PAD + "px";
      canvas.style.top = -PAD + "px";
      build();
      if (targetRef.current >= 1) {
        drainRef.current = 1;
        particlesRef.current.forEach((p) => (p.gone = true));
      }
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    return () => ro.disconnect();
  }, [build, draw]);

  // Myth: pour out once unlocked.
  useEffect(() => {
    if (forceDrain && !pouringRef.current) {
      pouringRef.current = true;
      targetRef.current = 1;
      ensureRunning();
    }
  }, [forceDrain, ensureRunning]);

  // Stay emptied if the parent says this one is already cleared.
  useEffect(() => {
    if (cleared && !pouringRef.current) {
      pouringRef.current = true;
      firedRef.current = true;
      targetRef.current = 1;
      ensureRunning();
    }
  }, [cleared, ensureRunning]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const onEnter = () => {
    if (!drainable || pouringRef.current) return;
    targetRef.current = HOVER_DRAIN; // lower the sand (reveal more)
    ensureRunning();
  };

  const onLeave = () => {
    if (!drainable || pouringRef.current) return;
    targetRef.current = REST_DRAIN; // raise it back up to the rest level
    ensureRunning();
  };

  const drainFully = () => {
    if (!drainable || pouringRef.current) return;
    pouringRef.current = true;
    targetRef.current = 1;
    ensureRunning();
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      drainFully();
    }
  };

  return (
    <div
      ref={wrapRef}
      className={"sand-circle" + (drainable ? " drainable" : "")}
      style={{ backgroundImage: `url(${image})` }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={drainFully}
      onKeyDown={onKeyDown}
      role="button"
      aria-label={label}
      tabIndex={drainable ? 0 : -1}
    >
      <canvas ref={canvasRef} className="sand-canvas" />
    </div>
  );
}

export default SandCircle;
