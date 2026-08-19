import React, { useState, useEffect } from "react";
import "../../assets/back_to_the_top.css";

// Show the button once the user has scrolled past this many pixels.
const SCROLL_THRESHOLD = 300;

function BackToTheTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set correct state on mount (e.g. after a refresh mid-page)
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      id="back-to-the-top"
      title="Back to the top"
    >
      {'\u2B9D'}
    </button>
  );
}

export default BackToTheTop;