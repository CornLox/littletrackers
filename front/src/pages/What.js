import React from "react";
import { useTranslation } from "react-i18next";
import TopSection from "../components/sections/TopSection";
import BackTotheTop from "../components/parts/BackToTheTop";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/sections/Footer";
import WhatSection from "../components/sections/WhatSection";
import banner_img from "../images/letter.jpg";

function What() {
  const { t } = useTranslation();
  return (
    <>
      <TopSection title={t("banner.press")} background={banner_img} />
      <BackTotheTop />
      <WhatSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default What;
