import React from "react";
import "../../assets/copyright.css";

const year = new Date().getFullYear();

function Copyright({ name, dev_name, dev_link }) {
  return (
    <div className="row copytright-row">
      <div className=" col-12 justify-content-end  d-flex">
        <div>
          <h6 className="copyright-text">{name} · {year} </h6>
        </div>
      </div>
      <div className=" col-12 justify-content-end  d-flex">
        <div className="d-flex">
          <h6 className="copyright-text">Created with </h6>
          <h6 id="love"> ♥ </h6>
          <h6 className="copyright-text">
            {" "}
            by <a target="_blank" rel="noopener noreferrer" href={dev_link}>{dev_name}</a>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Copyright;
