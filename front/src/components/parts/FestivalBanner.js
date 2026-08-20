import React from "react";
import { useTranslation } from "react-i18next";
import "../../assets/festival_banner.css";
import festival_slide from "../../images/overlooking.jpg";

const programme_link =
  "https://aefestival.gr/festival_events/mikroi-ichneytes/";

function FestivalBanner() {
  const { t } = useTranslation();
  return (
    <>
      <div id="festival-section">
        <a className="festival-link" href={programme_link} target="_blank">
          <div className="festival-txt container">
            <h1>{t("festival.findUs")}</h1>
          </div>

          <div
            className="container-fluid festival-banner"
            style={{ backgroundImage: "url(" + festival_slide + ")" }}
          ></div>
        </a>
      </div>
    </>
  );
}

export default FestivalBanner;
