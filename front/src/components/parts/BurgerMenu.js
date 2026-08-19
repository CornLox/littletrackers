import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../assets/burger_menu.css";

const menuOnClick = () => {
  document.getElementById("menu-bar")?.classList.toggle("change");
  document.getElementById("nav")?.classList.toggle("change");
  document.getElementById("menu-bg")?.classList.toggle("change-bg");
  document.getElementById("carousel-banner-inner")?.classList.toggle("change");
};

// SPA navigation doesn't reload the page, so the open menu would otherwise
// stay up over the destination — close it on any link click.
const closeMenu = () => {
  document.getElementById("menu-bar")?.classList.remove("change");
  document.getElementById("nav")?.classList.remove("change");
  document.getElementById("menu-bg")?.classList.remove("change-bg");
  document.getElementById("carousel-banner-inner")?.classList.remove("change");
};

function BurgerMenu() {
  const { t } = useTranslation();
  return (
    <>
      <div id="menu">
        <div id="menu-bar" onClick={menuOnClick}>
          <div id="bar1" className="bar"></div>
          <div id="bar2" className="bar"></div>
          <div id="bar3" className="bar"></div>
        </div>
        <nav className="nav" id="nav">
          <ul>
            <li>
              <Link to="/" onClick={closeMenu}>
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu}>
                {t("nav.about")}
              </Link>
            </li>
            {/* <li>
              <Link to="/#do-section" onClick={closeMenu}>
                {t("nav.do")}
              </Link>
            </li> */}
            {/* <li>
              <Link to="/#how-section" onClick={closeMenu}>
                {t("nav.how")}
              </Link>
            </li> */}
            <li>
              <Link to="/work" onClick={closeMenu}>
                {t("nav.workshops")}
              </Link>
            </li>
            <li>
              <Link to="/what" onClick={closeMenu}>
                {t("nav.press")}
              </Link>
            </li>
            <li>
              {/* relative hash: scrolls to the footer of the current page */}
              <Link to="#footer" onClick={closeMenu}>
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="menu-bg" id="menu-bg"></div>
    </>
  );
}

export default BurgerMenu;