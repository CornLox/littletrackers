import React from "react";
import { useTranslation } from "react-i18next";
import "../../assets/logo_banner.css";

function LogoBanner() {
  const { t } = useTranslation();
  return (
    <>
      <a href="./" id="logo" className="w-100">
        <h2 id="logo-title">{t("logo.title")}</h2>
        <h4 id="logo-subtitle">{t("logo.subtitle")}</h4>
      </a>
    </>
  );
}

export default LogoBanner;
