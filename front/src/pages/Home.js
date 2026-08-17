import React from "react";
import BurgerMenu from "../components/parts/BurgerMenu";
import LanguageBar from "../components/parts/LanguageBar";
import CarouselBanner from "../components/parts/CarouselBanner";
import LogoBanner from "../components/parts/LogoBanner";
import ContactSection from "../components/sections/ContactSection";
import AboutSection from "../components/sections/AboutSection";
import FixedBanner from "../components/parts/FixedBanner";
import DoSection from "../components/sections/DoSection";
import BackTotheTop from "../components/parts/BackToTheTop";
import HowSection from "../components/sections/HowSection";
import MetersSection from "../components/sections/MetersSection";
import Footer from "../components/sections/Footer";
import AdBanner from "../components/parts/AdBanner";


function Home() {
  return (
    <>
      <CarouselBanner />
      <BurgerMenu />
      <LanguageBar/>
      <LogoBanner />
      <AboutSection />
      <FixedBanner />
      <DoSection />
      <HowSection />
      <MetersSection />
      <AdBanner />
      <ContactSection />
      <BackTotheTop />
      <Footer />
    </>
  );
}

export default Home;
