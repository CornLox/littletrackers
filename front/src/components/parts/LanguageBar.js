import React from "react";
import { useTranslation } from "react-i18next";
import "../../assets/language_bar.css";

function LanguageBar() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language || "el";

  const changeLanguage = (lng) => {
    if (lng !== current) {
      i18n.changeLanguage(lng); // persists to localStorage + updates <html lang>
    }
  };

  return (
    <div id="language-bar">
      <div className="d-flex flex-column flex-sm-row ">
        <a
          id="greek-tab"
          className={"language-tab" + (current === "el" ? " active" : "")}
          onClick={() => changeLanguage("el")}
        >
          Ελ
        </a>
        <a
          id="english-tab"
          className={"language-tab" + (current === "en" ? " active" : "")}
          onClick={() => changeLanguage("en")}
        >
          Εn
        </a>
      </div>
    </div>
  );
}

export default LanguageBar;