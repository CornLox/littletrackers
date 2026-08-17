import React from "react";
import { useTranslation } from "react-i18next";
import TopSection from "../components/sections/TopSection";
import BackTotheTop from "../components/parts/BackToTheTop";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/sections/Footer";
import AboutPageSection from "../components/sections/AboutPageSection";
import banner_img from "../images/who_we_are_banner.jpg";

function About() {
  const { t } = useTranslation();
  return (
    <>
      <TopSection title={t("banner.about")} background={banner_img} />
      <BackTotheTop />
      <AboutPageSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default About;
