import React from "react";
import { useTranslation } from "react-i18next";
import TopSection from "../components/sections/TopSection";
import WorkSection from "../components/sections/WorkSection";
import BackTotheTop from "../components/parts/BackToTheTop";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/sections/Footer";
import banner_img from "../images/circle.jpg";
function Work() {
  const { t } = useTranslation();
  return (
    <>
      <TopSection title={t("banner.workshops")} background={banner_img} />
      <WorkSection />
      <BackTotheTop />
      <ContactSection />
      <Footer />
    </>
  );
}

export default Work;
