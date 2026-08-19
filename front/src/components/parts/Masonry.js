import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import { localizedField, resolveLang } from "../../utils/localizedField";
import "../../assets/masonry.css";
import API_BASE from "../../config";

const API_PROGRAMMES_URL = `${API_BASE}/api/programmes`;

// Two year ticks closer than this (px) would overlap, so we nudge the lower
// one down just enough to stay readable.
const MIN_TICK_GAP = 22;

function Masonry() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language && i18n.language.startsWith("en") ? "en" : "el";

  const [programmes, setProgrammes] = useState(null);
  const gridRef = useRef(null);
  const msnryRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [gridHeight, setGridHeight] = useState(0);

  // Which genres are currently shown. `null` until we know the genres, and
  // treated as "all visible" (the default) both before and until a toggle.
  const [activeGenres, setActiveGenres] = useState(null);

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const response = await fetch(API_PROGRAMMES_URL);
        const json = await response.json();
        if (response.ok) {
          setProgrammes(json);
        }
      } catch (error) {
        console.error("Failed to fetch programmes:", error);
      }
    };
    fetchProgrammes();
  }, []);

  // Most recent first, by opening date.
  const sortedProgrammes = useMemo(() => {
    if (!programmes) return null;
    return [...programmes].sort(
      (a, b) => new Date(b.openingDate) - new Date(a.openingDate)
    );
  }, [programmes]);

  // Distinct genres as stable keys (the Greek value), so a selection survives
  // language switches. Depends only on the data, not on `lang`.
  const genreKeys = useMemo(() => {
    if (!programmes) return [];
    const seen = new Set();
    const list = [];
    for (const p of programmes) {
      const key = localizedField(p, "genre", "el");
      if (key && !seen.has(key)) {
        seen.add(key);
        list.push(key);
      }
    }
    return list.sort((a, b) => a.localeCompare(b, "el"));
  }, [programmes]);

  // key -> label in the active language (recomputed on language change).
  const genreLabels = useMemo(() => {
    const m = new Map();
    if (programmes) {
      for (const p of programmes) {
        const key = localizedField(p, "genre", "el");
        if (key && !m.has(key)) m.set(key, localizedField(p, "genre", lang));
      }
    }
    return m;
  }, [programmes, lang]);

  // Default to all genres active once we know them. Keyed on genreKeys, which
  // is language-independent, so switching language never resets the filter.
  useEffect(() => {
    if (genreKeys.length) setActiveGenres(new Set(genreKeys));
  }, [genreKeys]);

  const toggleGenre = (key) => {
    setActiveGenres((prev) => {
      const next = new Set(prev ?? genreKeys);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const isVisible = (programme) => {
    if (!activeGenres) return true; // pre-init: everything shows
    const key = localizedField(programme, "genre", "el");
    if (!key) return true; // programmes without a genre are never filtered out
    return activeGenres.has(key);
  };

  // Drive Masonry from React. Two problems to handle: (1) the `data-masonry`
  // auto-init fires on DOMContentLoaded, before the fetched programmes exist,
  // so it never lays out the real items; (2) the Masonry script may finish
  // loading *after* this component mounts. So we poll briefly for
  // `window.Masonry` and initialise as soon as it's available.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !sortedProgrammes) return;

    let msnry = null;
    let detachListeners = () => {};

    const init = () => {
      const M = window.Masonry;
      if (!M) return false;

      const existing = typeof M.data === "function" ? M.data(grid) : null;
      msnry =
        existing ||
        new M(grid, {
          itemSelector: ".masonry-img-col",
          percentPosition: true,
        });
      if (existing) msnry.reloadItems();
      msnryRef.current = msnry;

      const relayout = () => msnry && msnry.layout();
      relayout();

      const imgs = Array.from(grid.querySelectorAll("img"));
      imgs.forEach((img) => img.addEventListener("load", relayout));
      window.addEventListener("resize", relayout);
      detachListeners = () => {
        imgs.forEach((img) => img.removeEventListener("load", relayout));
        window.removeEventListener("resize", relayout);
      };
      return true;
    };

    let intervalId = 0;
    if (!init()) {
      let tries = 0;
      intervalId = setInterval(() => {
        if (init() || ++tries > 50) clearInterval(intervalId); // give up after ~5s
      }, 100);
    }

    return () => {
      clearInterval(intervalId);
      detachListeners();
      if (msnry && typeof msnry.destroy === "function") msnry.destroy();
      msnryRef.current = null;
    };
  }, [sortedProgrammes]);

  // Read each in-layout item's vertical offset from the DOM and drop a tick
  // wherever the year changes. Items collapsed with display:none (the mobile
  // filter) have no box and are skipped, so ticks land on the first item that
  // still occupies space; visibility:hidden holes (sm+) still have a box and
  // are kept, preserving the current behaviour there.
  const measure = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const gridTop = grid.getBoundingClientRect().top;
    const next = [];
    let prevYear = null;

    grid.querySelectorAll("[data-year]").forEach((node) => {
      if (node.offsetWidth === 0 && node.offsetHeight === 0) return; // display:none
      const year = node.getAttribute("data-year");
      if (year !== prevYear) {
        next.push({
          year,
          top: node.getBoundingClientRect().top - gridTop,
        });
        prevYear = year;
      }
    });

    next.sort((a, b) => a.top - b.top);
    for (let i = 1; i < next.length; i++) {
      if (next[i].top - next[i - 1].top < MIN_TICK_GAP) {
        next[i] = { ...next[i], top: next[i - 1].top + MIN_TICK_GAP };
      }
    }

    setMarkers(next);
    setGridHeight(grid.offsetHeight);
  }, []);

  // Re-measure on first paint, image loads, resize, and any reflow.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    schedule();

    const ro = new ResizeObserver(schedule);
    ro.observe(grid);

    const imgs = Array.from(grid.querySelectorAll("img"));
    imgs.forEach((img) => img.addEventListener("load", schedule));
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      imgs.forEach((img) => img.removeEventListener("load", schedule));
      window.removeEventListener("resize", schedule);
    };
  }, [measure, sortedProgrammes]);

  // Re-pack and re-measure when the visible set changes. Below sm, toggling a
  // genre collapses items (heights change); at sm+ the holes keep their slots.
  // Either way we let Masonry settle first, then measure the rail.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (msnryRef.current) msnryRef.current.layout();
      measure();
    });
    return () => cancelAnimationFrame(raf);
  }, [activeGenres, measure]);

  return (
    <div id="masonry"className="container">
      {genreKeys.length > 0 && (
        <div className="masonry-genres" role="group">
          {genreKeys.map((key) => {
            const active = !activeGenres || activeGenres.has(key);
            return (
              <button
                key={key}
                type="button"
                className={"masonry-genre-btn" + (active ? " active" : "")}
                aria-pressed={active}
                onClick={() => toggleGenre(key)}
              >
                {genreLabels.get(key) || key}  {(active ? "\u2714" : "") }
              </button>
            );
          })}
        </div>
      )}

      <div className="masonry-timeline-wrap">
        {/* Timeline rail: an absolute overlay, NOT a grid child, so Masonry
            never treats it as an item. */}
        <div
          className="masonry-timeline"
          aria-hidden="true"
          style={{ height: gridHeight || undefined }}
        >
          <span className="masonry-timeline-line" />
          {markers.map((m) => (
            <span
              key={m.year}
              className="masonry-timeline-mark"
              style={{ top: m.top }}
            >
              <span className="masonry-timeline-dot" />
              <span className="masonry-timeline-year">{m.year}</span>
            </span>
          ))}
        </div>

        <div
          ref={gridRef}
          className="row g-0 "
          data-masonry='{"percentPosition": true }'
        >
          {sortedProgrammes &&
            sortedProgrammes.map((programme) => {
              const year = new Date(programme.openingDate).getFullYear();
              const visible = isVisible(programme);
              const director = localizedField(programme, "director", lang);
              return (
                <div
                  key={programme._id}
                  className={
                    "col-12 col-sm-4 col-md-3 col-lg-2 masonry-img-col" +
                    (visible ? "" : " masonry-hidden")
                  }
                  data-year={String(year)}
                >
                  <img
                    className="img-fluid masonry-img"
                    src={`${API_PROGRAMMES_URL}/${programme._id}/promo`}
                    alt=""
                    data-bs-toggle="modal"
                    data-bs-target={"#" + programme._id + "-modal"}
                  />
                  <Modal
                    modal_id={programme._id}
                    modal_class="programme-modal"
                    modal_title={`${localizedField(programme, "title", lang)}`}
                    modal_subtitle={`${localizedField(programme, "subtitle", lang)}`}
                    modal_subtitle2={
                      director ? `${t("work.by")} ${director}` : undefined
                    }
                    modal_subtitle3={`${localizedField(programme, "dates", lang)}`}
                    modal_txt={localizedField(programme, "description", lang)}
                    modal_img={`${API_PROGRAMMES_URL}/${programme._id}/promo`}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Masonry;