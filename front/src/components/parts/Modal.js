import React from "react";
import { useTranslation } from "react-i18next";
import "../../assets/modal.css";

function Modal({
  modal_id,
  modal_title,
  modal_subtitle,
  modal_subtitle2,
  modal_subtitle3,
  modal_txt,
  modal_img,
  modal_images,
  modal_link,
  modal_class,
}) {
  const { t } = useTranslation();

  // The "who" page team cards use the clean, centered band-style layout.
  const isTeam = modal_class === "team-modal";
  // The workshops-page programme cards: static header, media + title in body.
  const isProgramme = modal_class === "programme-modal";

  // Support a single image (modal_img) or several (modal_images).
  const images =
    modal_images && modal_images.length > 0
      ? modal_images
      : [modal_img].filter(Boolean);

  const isExternal = (href) => /^(https?:)?\/\//i.test(href);

  const dialogClass = isTeam
    ? "modal-dialog modal-dialog-centered modal-lg"
    : "modal-dialog";

  return (
    <div
      className={"modal fade " + (modal_class || "")}
      id={modal_id + "-modal"}
      tabIndex={-1}
      aria-labelledby={modal_id + "ModalLabel"}
      aria-hidden="true"
      data-bs-backdrop="true"
      data-bs-keyboard="true"
    >
      <div className={dialogClass}>
        <div className="modal-content container">
          {isTeam ? (
            <>
              <div className="modal-header">
                <div className="modal-heading">
                  <h5 className="modal-title" id={modal_id + "ModalLabel"}>
                    {modal_title}
                  </h5>
                  {modal_subtitle && (
                    <h6 className="modal-subtitle">{modal_subtitle}</h6>
                  )}
                </div>
                <button
                  type="button"
                  className="btn-close modal-close-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>

              <div className="modal-body">
                {images.length > 0 && (
                  <div className="modal-images">
                    {images.map((src, i) => (
                      <figure key={i} className="modal-figure">
                        <img
                          src={src}
                          alt={modal_title}
                          className="modal-cover img-fluid"
                        />
                      </figure>
                    ))}
                  </div>
                )}

                {modal_txt && <p className="modal-extra">{modal_txt}</p>}

                {modal_link && (
                  <p className="modal-store">
                    <a
                      className="modal-store-link"
                      href={modal_link}
                      target={isExternal(modal_link) ? "_blank" : undefined}
                      rel={
                        isExternal(modal_link)
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      Learn more
                    </a>
                  </p>
                )}
              </div>

              <div className="modal-footer" />
            </>
          ) : isProgramme ? (
            <>
              {/* Workshops page — static header; promo image + title moved
                  into the body, above the description. */}
              <div className="modal-header">
                <h4 className="modal-title text-center" id={modal_id + "ModalLabel"}>
                  {t("work.tracking")}
                </h4>
                <button
                  type="button"
                  className="close modal-close-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  +
                </button>
              </div>

              <div className="modal-body">
                {/* Image first in source + floated in CSS, so the title and
                    text below wrap around it on md and up. */}
                {modal_img != undefined && (
                  <img
                    src={modal_img}
                    className="modal-img"
                    alt={modal_title}
                  />
                )}
                {modal_title && (
                  <h4 className="modal-body-title">{modal_title}</h4>
                )}
                {modal_subtitle && (
                  <h5 className="modal-body-subtitle">{modal_subtitle}</h5>
                )}
                {modal_subtitle2 && (
                  <h6 className="modal-body-subtitle">{modal_subtitle2}</h6>
                )}
                {modal_subtitle3 && (
                  <h6 className="modal-body-subtitle">{modal_subtitle3}</h6>
                )}
                {modal_txt && (
                  <p className="modal-body-text">{modal_txt}</p>
                )}
              </div>

              <div className="modal-footer"></div>
            </>
          ) : (
            <>
              {/* Legacy layout — used by HowSection. Header holds the title;
                  the picture sits in the body and (at lg+) floats left so the
                  text wraps around it, like the programme modal. */}
                  
              <div className="modal-header">
                <h5 className="modal-title" id={modal_id + "ModalLabel"}>
                  {modal_title}
                </h5>
                <button
                  type="button"
                  className="close modal-close-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  +
                </button>
              </div>
              <div className="modal-body">
                {modal_img != undefined && (
                  <img
                    src={modal_img}
                    className="modal-img"
                    alt={modal_title}
                  />
                )}
                {modal_txt}
              </div>
              <div className="modal-footer"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;