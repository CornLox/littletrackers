import React from "react";
import { useTranslation } from "react-i18next";
import "../../assets/ad_banner.css";
import ad_slide from "../../images/overlooking.jpg";

const programme_link =
  "https://aefestival.gr/festival_events/mikroi-ichneytes/";

function ΑdBanner() {
  const { t } = useTranslation();
  return (
    <>
      <div id="ad-section">
        <a className=".ad-link" href={programme_link} target="_blank">
          <div className="ad-txt container">
            <h1>{t("ad.findUs")}</h1>
          </div>

          <div
            className="container-fluid ad-banner"
            style={{ backgroundImage: "url(" + ad_slide + ")" }}
          ></div>
        </a>
      </div>
    </>
  );
}

export default ΑdBanner;
