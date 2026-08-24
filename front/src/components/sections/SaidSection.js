import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../assets/said_section.css";
import Title from "../parts/Title";

function SaidSection() {
  const { t } = useTranslation();

  // Reviews come from the locale files (said.items). returnObjects lets us map
  // over however many are defined without hard-coding the count — add more
  // entries in el.json / en.json and they show up automatically.
  const itemsObj = t("said.items", { returnObjects: true });
  const reviews =
    itemsObj && typeof itemsObj === "object"
      ? Object.values(itemsObj).map((item) => item.text)
      : [];

  // Bootstrap auto-inits carousels from data-bs-ride on page load, but this one
  // is rendered by React afterwards, so it's never initialised — no autoplay and
  // no touch-swipe handlers on mobile. Create the instance explicitly on mount
  // (bootstrap.bundle is loaded via CDN in index.html, so it's on window).
  useEffect(() => {
    const el = document.getElementById("said-carousel");
    if (!el || !window.bootstrap || !window.bootstrap.Carousel) return;
    const carousel = window.bootstrap.Carousel.getOrCreateInstance(el, {
      ride: "carousel",
      touch: true,
      interval: 10000,
    });
    return () => carousel.dispose();
  }, []);

  return (
    <section id="said-section">
      <div className="container">
        <Title title={t("said.title")} hrId="said-section-hr" />

        <div className="said-sea">
          <div
            id="said-carousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {reviews.map((text, i) => (
                <React.Fragment key={i}>
                  {/* the boat carrying the review — lingers so it can be read */}
                  <div
                    className={`carousel-item${i === 0 ? " active" : ""}`}
                    data-bs-interval="10000"
                  >
                    <div className="boat">
                      <span className="boat-mast" aria-hidden="true"></span>
                      <p className="boat-review">{text}</p>
                    </div>
                  </div>

                  {/* a beat of empty sea: the boat has sailed off to the left
                      and the next hasn't arrived yet — sells the movement */}
                  <div
                    className="carousel-item said-empty"
                    data-bs-interval="2000"
                    aria-hidden="true"
                  ></div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SaidSection;