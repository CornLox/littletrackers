import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import "../../assets/do_section.css";
import Title from "../parts/Title";
import SandCircle from "../parts/SandCircle";
import circle1 from "../../images/drama.png";
import circle2 from "../../images/music.png";
import circle3 from "../../images/paint.png";
import circle4 from "../../images/myth.png";

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

  return (
    <>
      <section id="do-section">
        <div className="container">
          <Title title={t("do.title")} hrId="do-section-hr" />
          <div className="row  mt-5">
            <div className="col-lg-2 g-0 align-items-center d-none d-lg-flex">
              <hr id="do-section-img-hr-top-left" />
            </div>
            <div className="col-lg-2 g-0 d-none d-lg-flex ">
              <SandCircle
                image={circle1}
                cleared={cleared.theater}
                onCleared={() => clear("theater")}
                label={t("do.theater")}
              />
            </div>
            <div className="col-lg-1 g-0 align-items-center d-none d-lg-flex">
              <hr className="do-section-img-hr" />
            </div>
            <div className="col-lg-2 g-0 d-none d-lg-flex ">
              <SandCircle
                image={circle2}
                cleared={cleared.music}
                onCleared={() => clear("music")}
                label={t("do.music")}
              />
            </div>
            <div className="col-lg-1 g-0 align-items-center d-none d-lg-flex">
              <hr className="do-section-img-hr" />
            </div>
            <div className="col-lg-2 g-0 d-none d-lg-flex ">
              <SandCircle
                image={circle3}
                cleared={cleared.painting}
                onCleared={() => clear("painting")}
                label={t("do.arts")}
              />
            </div>
            <div className="col-lg-2 g-0 align-items-center d-flex">
              <hr id="do-section-img-hr-top-right" />
            </div>
            <div className="col-12 align-items-center d-flex py-5 px-0 mx-0 order-3 order-lg-0">
              <span className="material-symbols-outlined do-arrow-icon-left d-none d-lg-flex p-0 m-0">
                barefoot
              </span>
              <p className="text-center px-lg-5 mx-lg-5">
                {t("do.intro")}
                <span id="theater-span" className={spanClass("theater")}>
                  {t("do.theater")}
                </span>
                {t("do.frag1")}
                <span id="music-span" className={spanClass("music")}>
                  {t("do.music")}
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
              <span className="material-symbols-outlined d-none d-lg-flex do-arrow-icon-right p-0 m-0">
                barefoot
              </span>
            </div>
            <div className="col-lg-2 g-0 align-items-center d-flex order-5 order-lg-0">
              <hr id="do-section-img-hr-bottom-left" />
            </div>
            <div className="col-12 col-lg-1 g-0 align-items-center justify-content-end justify-content-lg-start  d-flex order-4 order-lg-0">
              <span className="material-symbols-outlined do-arrow-icon-bottom-left p-0 m-0">
                barefoot
              </span>
            </div>
            <div className="col-lg-2 g-0 align-items-center d-none d-lg-flex">
              <hr className="do-section-img-hr" />
            </div>
            <div className="col-lg-2 g-0 d-none d-lg-flex ">
              <SandCircle
                image={circle4}
                drainable={false}
                forceDrain={trioDone}
                cleared={cleared.myth}
                onCleared={() => clear("myth")}
                label={t("do.drama")}
              />
            </div>
            <div className="col-lg-2 g-0 align-items-center d-none d-lg-flex">
              <hr className="do-section-img-hr" />
            </div>
            <div className="col-12 col-lg-1 g-0 align-items-center justify-content-end justify-content-lg-start  d-flex order-3 order-lg-0 ">
              <span className="material-symbols-outlined do-arrow-icon-bottom-right p-0 m-0">
                barefoot
              </span>
            </div>
            <div className="col-lg-2 g-0 align-items-center d-none d-lg-flex">
              <hr id="do-section-img-hr-bottom-right" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DoSection;
