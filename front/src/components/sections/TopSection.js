import React from "react";
import BurgerMenu from "../parts/BurgerMenu";
import TopBanner from "../parts/TopBanner";
import LogoBanner from "../parts/LogoBanner";
import LanguageBar from "../parts/LanguageBar";

// When the user scrolls down 20px from the top of the document, show the button

function TopSection({ title, background }) {
  return (
    <>
      <TopBanner title={title} background={background} />
      <BurgerMenu />
      <LanguageBar/>
      <LogoBanner />
    </>
  );
}

export default TopSection;
