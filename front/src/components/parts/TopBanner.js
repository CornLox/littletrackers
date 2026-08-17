import React from "react";
import "../../assets/top_banner.css";

function TopBanner({ title, background }) {
  return (
    <>
      <div id="top-banner">
        <div id="carousel-banner-inner" className="top-inner">
          <div className="top-item">
            <div
              className="img-wrapper w-100"
              style={{ backgroundImage: `url(${background})` }}
            />

            <div id="top-caption">
              <h1>{title}</h1>
              {/* <p>Ότι πουν τα παιδιά!</p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopBanner;
