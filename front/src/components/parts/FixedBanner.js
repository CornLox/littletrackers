import React from "react";
import "../../assets/fixed_banner.css";
import fixed_slide from "../../images/fixed_slide.jpg";

function AdBanner() {
  return (
    <>
      <div
        className="container-fluid fixed-banner"
        style={{ backgroundImage: "url(" + fixed_slide + ")" }}
      ></div>
    </>
  );
}

export default AdBanner;
