import React from "react";
import { useTranslation } from "react-i18next";
import "../../assets/about_section.css";
import Title from "../parts/Title";
import theater from "../../images/theater.jpg";
import plaggona from "../../images/plaggona.jpg";

function AboutSection() {
  const { t } = useTranslation();
  return (
    <>
      <section id="about-section">
        <div className="container">
          <Title title={t("about.title")} hrId="about-section-hr" />
          <div className="row img-row">
            <div className="col-6 img-col" id="theater-col">
              <img className="img-fluid" src={theater} alt="" />
            </div>
            <div className="col-md-6 z-1 z-md-0 align-self-center txt-col">
              <p>{t("about.p1")}</p>
            </div>
          </div>
          <div className="row img-row">
            <div className="col-md-6 z-1 z-md-0 align-self-center txt-col">
              <p>{t("about.p2")}</p>
            </div>
            <div className="col-6 img-col align-self-end" id="plaggona-col">
              <img className="img-fluid" src={plaggona} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutSection;
