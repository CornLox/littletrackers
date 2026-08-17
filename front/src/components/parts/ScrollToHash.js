import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Handles in-app scrolling on navigation:
//  - with a hash (e.g. /#do-section), scroll to that element once it exists
//  - without a hash, start the new page at the top
// The retry loop matters because the home sections can mount a frame or two
// after the route commits (async content), so the target may not be in the
// DOM at the moment navigation happens.
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let frames = 0;
    let raf = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (frames < 60) {
        // ~1s worth of frames — enough for the section to mount.
        frames += 1;
        raf = requestAnimationFrame(tryScroll);
      }
    };

    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}

export default ScrollToHash;