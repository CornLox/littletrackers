import React from "react";
import { useTranslation } from "react-i18next";
import "../../assets/carousel_banner.css";
import slide1 from "../../images/empathy.jpg";
import slide2 from "../../images/imagination.jpg";
import slide3 from "../../images/creativity.jpg";
import slide4 from "../../images/challenge.jpg";

function CarouzelBanner() {
  const { t } = useTranslation();
  return (
    <>
      <div id="banner" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#banner"
            data-bs-slide-to="0"
            className="carouzel-slide active"
          ></button>
          <button
            type="button"
            data-bs-target="#banner"
            data-bs-slide-to="1"
            className="carouzel-slide"
          ></button>
          <button
            type="button"
            data-bs-target="#banner"
            data-bs-slide-to="2"
            className="carouzel-slide"
          ></button>
          <button
            type="button"
            data-bs-target="#banner"
            data-bs-slide-to="3"
            className="carouzel-slide"
          ></button>
        </div>

        <div id="carousel-banner-inner" className="carousel-inner">
          <div className="carousel-item active">
            <div className="img-wrapper">
              <img src={slide1} alt="first" className="d-block w-100 h-100" />
            </div>
            <div className="carousel-caption">
              <h1>{t("carousel.empathy")}</h1>
            </div>
          </div>
          <div className="carousel-item">
            <div className="img-wrapper">
              <img src={slide2} alt="second" className="d-block w-100 h-100" />
            </div>
            <div className="carousel-caption">
              <h1>{t("carousel.imagination")}</h1>
            </div>
          </div>
          <div className="carousel-item">
            <div className="img-wrapper">
              <img src={slide3} alt="third" className="d-block w-100 h-100" />
            </div>
            <div className="carousel-caption">
              <h1>{t("carousel.creativity")}</h1>
            </div>
          </div>
          <div className="carousel-item">
            <div className="img-wrapper">
              <img src={slide4} alt="fourth" className="d-block w-100 h-100" />
            </div>
            <div className="carousel-caption">
              <h1>{t("carousel.challenge")}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarouzelBanner;
