import React from "react";
import "../../assets/title.css";


function Title({ title, hrId }) {
  return (
    <div className="row title-row">
      <div className="col-12 justify-content-center d-flex">
        <div id={hrId}>
          {title !== "" ? (
            <h2 className="title-txt">{title}</h2>
          ) : (
            <h2 className="title-txt">no title</h2>
          )}
          <hr className="underline" />
        </div>
      </div>
    </div>
  );
}

export default Title;
