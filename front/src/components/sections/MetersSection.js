import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../assets/meters_section.css";
import Title from "../parts/Title";
import API_BASE from "../../config";

const API_PROGRAMMES_URL = `${API_BASE}/api/programmes`;

// Animate 0 -> target once `active` becomes true (easeOutCubic).
function useCountUp(target, active, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || !target) {
      setValue(target && active ? target : 0);
      return;
    }
    let raf = 0;
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);

  return value;
}

function Meter({ label, value, active }) {
  const shown = useCountUp(value, active);
  return (
    <div className="col-12 col-md-4 meter">
      <span className="meter-number">{shown.toLocaleString()}</span>
      <span className="meter-label">{label}</span>
    </div>
  );
}

function MetersSection() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);

  // Programme count drives all three meters.
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(API_PROGRAMMES_URL);
        const json = await response.json();
        if (response.ok && Array.isArray(json)) setCount(json.length);
      } catch (error) {
        console.error("Failed to fetch programmes:", error);
      }
    };
    fetchCount();
  }, []);

  // Start the count-up the first time the section scrolls into view.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const meters = [
    { key: "workshops", value: count },
    { key: "performances", value: count * 2 },
    { key: "children", value: count * 80 },
  ];

  return (
    <section id="meters-section" ref={sectionRef}>
      <div className="container">
        <Title title={t("meters.title")} hrId="meters-section-hr" />
        <div className="row justify-content-center">
          {meters.map((m) => (
            <Meter
              key={m.key}
              label={t(`meters.${m.key}`)}
              value={m.value}
              active={active}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MetersSection;