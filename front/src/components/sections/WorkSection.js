import React from "react";
import { useTranslation } from "react-i18next";
import "../../assets/work_section.css";
import Masonry from "../parts/Masonry";
import Title from "../parts/Title";

function WorkSection() {
  const { t } = useTranslation();
  return (
    <section id="work-section">
      <div className="container">
        <Title title={t("work.title")} hrId="work-section-hr" />

        <Masonry />
      </div>
    </section>
  );
}

export default WorkSection;
