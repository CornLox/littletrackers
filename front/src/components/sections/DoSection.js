import React, {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { useTranslation } from "react-i18next";
import "../../assets/do_section.css";
import Title from "../parts/Title";
import SandCircle from "../parts/SandCircle";
import circle1 from "../../images/drama.png";
import circle2 from "../../images/music.png";
import circle3 from "../../images/paint.png";
import circle4 from "../../images/myth.png";
// colored versions, shown once a circle is fully cleared of sand
import circle1Color from "../../images/drama-color.png";
import circle2Color from "../../images/music-color.png";
import circle3Color from "../../images/paint-color.png";
import circle4Color from "../../images/myth-color.png";

// ---- Trail tunables ---------------------------------------------------------
const CORNER = 100; // rounded-corner radius of the loop (matches .do-loop CSS)
const SIDE_INSET = 0.07; // vertical sides sit this fraction in from each edge (wider = more room for the paragraph)
const FOOT_STEP = 66; // px between footprints along the trail
const FOOT_LATERAL = 14; // px each print is nudged to its track (left vs right)
const LG = 992; // trail is desktop-only, like the circles

// Two distinct toddler footprints (drawn toes-up), so the alternating gait is
// legible. They are true mirrors of each other — big toe on opposite sides —
// and carry .do-foot-left / .do-foot-right so you can target either track.
function FootLeftShape() {
  return (
    <>
      <path d="M12 6 C15.8 6 18.2 9 18.2 13 C18.2 17 15.5 19.5 11.6 19.5 C7.8 19.5 5.4 17 5.4 13.2 C5.4 9 8.2 6 12 6 Z" />
      <ellipse cx="10.8" cy="25.3" rx="4.7" ry="3.9" />
      <circle cx="15.8" cy="3.4" r="2.0" />
      <circle cx="12.2" cy="2.3" r="1.7" />
      <circle cx="9.0" cy="2.9" r="1.5" />
      <circle cx="6.4" cy="4.6" r="1.3" />
      <circle cx="4.7" cy="7.2" r="1.1" />
    </>
  );
}

function FootRightShape() {
  return (
    <>
      <path d="M12 6 C8.2 6 5.8 9 5.8 13 C5.8 17 8.5 19.5 12.4 19.5 C16.2 19.5 18.6 17 18.6 13.2 C18.6 9 15.8 6 12 6 Z" />
      <ellipse cx="13.2" cy="25.3" rx="4.7" ry="3.9" />
      <circle cx="8.2" cy="3.4" r="2.0" />
      <circle cx="11.8" cy="2.3" r="1.7" />
      <circle cx="15.0" cy="2.9" r="1.5" />
      <circle cx="17.6" cy="4.6" r="1.3" />
      <circle cx="19.3" cy="7.2" r="1.1" />
    </>
  );
}

// parity 0 = left foot on the left track, parity 1 = right foot on the right
// track. Each print is offset to its own side of the line and rotated to follow
// the walking direction (the shapes are pre-mirrored, so no scaleX).
function Foot({ x, y, dir, parity }) {
  const isRight = parity === 1;
  const rad = (dir * Math.PI) / 180;
  const lateral = isRight ? FOOT_LATERAL : -FOOT_LATERAL;
  const ox = Math.cos(rad + Math.PI / 2) * lateral;
  const oy = Math.sin(rad + Math.PI / 2) * lateral;
  return (
    <svg
      className={`do-foot ${isRight ? "do-foot-right" : "do-foot-left"}`}
      width="24"
      height="30"
      viewBox="0 0 24 30"
      style={{
        left: x - 12 + ox,
        top: y - 15 + oy,
        transform: `rotate(${dir + 90}deg)`,
      }}
    >
      {isRight ? <FootRightShape /> : <FootLeftShape />}
    </svg>
  );
}

function DoSection() {
  const { t } = useTranslation();

  const [cleared, setCleared] = useState({
    theater: false,
    music: false,
    painting: false,
    myth: false,
  });

  const clear = useCallback((key) => {
    setCleared((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  }, []);

  // The myth circle unlocks (and auto-drains) once the trio is cleared.
  const trioDone = cleared.theater && cleared.music && cleared.painting;
  const spanClass = (key) => (cleared[key] ? "show" : "");

  // ---- Trail geometry: measure the circle centres, lay a loop + prints ------
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [loop, setLoop] = useState(null);
  const [feet, setFeet] = useState([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const compute = () => {
      if (window.innerWidth < LG) {
        setLoop(null);
        setFeet([]);
        return;
      }
      const tr = track.getBoundingClientRect();
      const rectOf = (name) => {
        const el = section.querySelector(
          `[data-trailpoint="${name}"] .sand-circle`
        );
        return el ? el.getBoundingClientRect() : null;
      };
      const th = rectOf("theater");
      const my = rectOf("myth");
      if (!th || !my || !tr.width) return;

      const toLocal = (r) => ({
        x: r.left + r.width / 2 - tr.left,
        y: r.top + r.height / 2 - tr.top,
        r: r.width / 2,
      });
      const circles = ["theater", "music", "painting", "myth"]
        .map(rectOf)
        .filter(Boolean)
        .map(toLocal);

      const W = tr.width;
      const yTop = toLocal(th).y;
      const yBot = toLocal(my).y;
      const x0 = W * SIDE_INSET;
      const x1 = W - x0;

      // punch a hole in the loop where each circle sits, so the trail stops at
      // the circle's edge and resumes on the far side (coords are relative to
      // the loop box, whose origin is x0 / yTop)
      const mask = circles
        .map((c) => {
          const r = c.r + 1;
          return `radial-gradient(circle ${r}px at ${c.x - x0}px ${c.y - yTop}px, transparent 0 ${r}px, #000 ${r}px)`;
        })
        .join(", ");

      setLoop({ top: yTop, left: x0, width: x1 - x0, height: yBot - yTop, mask });

      // keep prints off the circles and off the paragraph text
      const paraEl = section.querySelector('[data-trailpoint="para"]');
      const pr = paraEl
        ? (() => {
            const r = paraEl.getBoundingClientRect();
            return {
              x0: r.left - tr.left,
              x1: r.right - tr.left,
              y0: r.top - tr.top,
              y1: r.bottom - tr.top,
            };
          })()
        : null;
      const blocked = (x, y) =>
        circles.some((c) => Math.hypot(x - c.x, y - c.y) < c.r + 8) ||
        (pr && x > pr.x0 - 14 && x < pr.x1 + 14 && y > pr.y0 - 14 && y < pr.y1 + 14);

      // Directions all resolve toward the myth circle (bottom centre): the top
      // follows the line with a gentle downward lean, the two sides descend,
      // and each half of the bottom edge converges on myth. Right-hand segments
      // are phase-shifted by half a step so the trail isn't a perfect mirror.
      const xc = (x0 + x1) / 2; // centre column = where the myth circle sits
      const R = Math.min(CORNER, (x1 - x0) / 2, (yBot - yTop) / 2);
      const half = FOOT_STEP / 2;

      const topL = [];
      for (let x = xc - FOOT_STEP; x >= x0 + R; x -= FOOT_STEP) topL.push([x, yTop, 165]);
      const topR = [];
      for (let x = xc; x <= x1 - R; x += FOOT_STEP) topR.push([x, yTop, 15]);
      const sideL = [];
      for (let y = yTop + R; y <= yBot - R; y += FOOT_STEP) sideL.push([x0, y, 90]);
      const sideR = [];
      for (let y = yTop + R + half; y <= yBot - R; y += FOOT_STEP) sideR.push([x1, y, 90]);
      const botL = [];
      for (let x = x0 + R; x <= xc; x += FOOT_STEP) botL.push([x, yBot, 0]);
      const botR = [];
      for (let x = x1 - R - half; x >= xc; x -= FOOT_STEP) botR.push([x, yBot, 180]);

      const out = [];
      let id = 0;
      [topL, topR, sideL, sideR, botL, botR].forEach((seg) => {
        let j = 0; // gait alternates within each segment → prints straddle the line
        seg.forEach(([x, y, dir]) => {
          if (!blocked(x, y)) {
            out.push({ x, y, dir, parity: j % 2, id });
            id += 1;
            j += 1;
          }
        });
      });
      setFeet(out);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(section);
    window.addEventListener("resize", compute);
    window.addEventListener("load", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
      window.removeEventListener("load", compute);
    };
  }, []);

  return (
    <>
      <section id="do-section" ref={sectionRef}>
        <div className="container">
          <Title title={t("do.title")} hrId="do-section-hr" />

          <div className="do-stage">
            {/* decorative trail overlay (desktop only) */}
            <div
              className="do-track d-none d-lg-block"
              ref={trackRef}
              aria-hidden="true"
            >
              {loop && (
                <div
                  className="do-loop"
                  style={{
                    top: loop.top,
                    left: loop.left,
                    width: loop.width,
                    height: loop.height,
                    WebkitMaskImage: loop.mask,
                    maskImage: loop.mask,
                    WebkitMaskComposite: "source-in",
                    maskComposite: "intersect",
                  }}
                />
              )}
              {feet.map((f) => (
                <Foot key={f.id} {...f} />
              ))}
            </div>

            <div className="row row-do mt-lg-5">
              {/* -------- top row: music · theater · painting -------- */}
              <div className="col-lg-2 g-0 d-none d-lg-flex" />
              <div
                className="col-lg-2 g-0 d-none d-lg-flex"
                data-trailpoint="music"
              >
                <SandCircle
                  image={cleared.music ? circle2Color : circle2}
                  cleared={cleared.music}
                  onCleared={() => clear("music")}
                  label={t("do.music")}
                />
              </div>
              <div className="col-lg-1 g-0 d-none d-lg-flex" />
              <div
                className="col-lg-2 g-0 d-none d-lg-flex"
                data-trailpoint="theater"
              >
                <SandCircle
                  image={cleared.theater ? circle1Color : circle1}
                  cleared={cleared.theater}
                  onCleared={() => clear("theater")}
                  label={t("do.theater")}
                />
              </div>
              <div className="col-lg-1 g-0 d-none d-lg-flex" />
              <div
                className="col-lg-2 g-0 d-none d-lg-flex"
                data-trailpoint="painting"
              >
                <SandCircle
                  image={cleared.painting ? circle3Color : circle3}
                  cleared={cleared.painting}
                  onCleared={() => clear("painting")}
                  label={t("do.arts")}
                />
              </div>
              <div className="col-lg-2 g-0 d-none d-lg-flex" />

              {/* -------- middle: the explanatory text -------- */}
              <div className="col-12 py-5 px-0 mx-0">
                <p className="text-center" data-trailpoint="para">
                  {t("do.intro")}
                  <span id="music-span" className={spanClass("music")}>
                    {t("do.music")}
                  </span>
                  {t("do.frag1")}
                  <span id="theater-span" className={spanClass("theater")}>
                    {t("do.theater")}
                  </span>
                  {t("do.frag2")}
                  <span id="painting-span" className={spanClass("painting")}>
                    {t("do.arts")}
                  </span>
                  {t("do.frag3")}
                  <span id="myth-span" className={spanClass("myth")}>
                    {t("do.drama")}
                  </span>
                  {t("do.outro")}
                </p>
              </div>

              {/* mobile-only footprint "signature": a few toddler steps walking
                  toward the right edge under the paragraph (the desktop trail is
                  hidden below lg) */}
              <div
                className="col-12 d-lg-none do-foot-signature"
                aria-hidden="true"
              >
                {[0, 1, 2, 3, 4].map((i) => {
                  const isRight = i % 2 === 1;
                  return (
                    <svg
                      key={i}
                      className={`do-foot ${
                        isRight ? "do-foot-right" : "do-foot-left"
                      }`}
                      width="20"
                      height="26"
                      viewBox="0 0 24 30"
                      style={{
                        left: `${50 + i * 10}%`,
                        top: isRight ? 22 : 6,
                        transform: "rotate(90deg)",
                      }}
                    >
                      {isRight ? <FootRightShape /> : <FootLeftShape />}
                    </svg>
                  );
                })}
              </div>

              {/* -------- bottom row: myth / drama (centre) -------- */}
              <div className="col-lg-2 g-0 d-none d-lg-flex" />
              <div className="col-lg-1 g-0 d-none d-lg-flex" />
              <div className="col-lg-2 g-0 d-none d-lg-flex" />
              <div
                className="col-lg-2 g-0 d-none d-lg-flex"
                data-trailpoint="myth"
              >
                <SandCircle
                  image={cleared.myth ? circle4Color : circle4}
                  drainable={false}
                  forceDrain={trioDone}
                  cleared={cleared.myth}
                  onCleared={() => clear("myth")}
                  label={t("do.drama")}
                />
              </div>
              <div className="col-lg-2 g-0 d-none d-lg-flex" />
              <div className="col-lg-1 g-0 d-none d-lg-flex" />
              <div className="col-lg-2 g-0 d-none d-lg-flex" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DoSection;