import React from "react";
import { useTranslation } from "react-i18next";
import "../../assets/contact_section.css";
import festival_logo from "../../images/aef-header-logo-black.png";
import ziria_logo from "../../images/logo-cJBEi-evp-transformed.png";
import ananas_logo from "../../images/ananas_logo.jpg";
import bet_logo from "../../images/bet_logo.jpg";
import celesta_logo from "../../images/celesta_logo.jpg";
import kaleidoskopio_logo from "../../images/kaleidoskopio_logo.jpg";

function ContactSection() {
  const { t } = useTranslation();
  return (
    <>
      <section id="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 flex-column d-flex mb-4 mb-md-0">
              <div className="justify-content-between justify-content-md-around flex-column d-flex">
                <div className="justify-content-start flex-column d-flex">
                  <h4 className="contact-title mb-0">{t("contact.partners")}</h4>
                  <hr
                    id="contact-underline-1"
                    className="contact-underline mt-2"
                  />
                </div>
                <div>
                  <a
                    id="festival-logo-link"
                    target="_blank"
                    href="https://aefestival.gr/"
                  >
                    <img
                      id="festival-logo"
                      className="img-fluid"
                      src={festival_logo}
                      alt=""
                    />
                  </a>
                  <a
                    id="festival-logo-link"
                    target="_blank"
                    href="https://www.ziriafestival.gr//"
                  >
                    <img
                      id="ziria-logo"
                      className="img-fluid"
                      src={ziria_logo}
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 flex-column d-flex">
              <div className="justify-content-between justify-content-md-around d-flex">
                <div className="justify-content-start flex-column d-flex">
                  <h4 className="contact-title mb-0">{t("contact.friends")}</h4>
                  <hr
                    id="contact-underline-3"
                    className="contact-underline mt-2"
                  />
                </div>
                <a
                  className="contact-logo-link"
                  target="_blank"
                  href="https://m.facebook.com/profile.php?id=100057069745013&_rdr"
                >
                  <img
                    className="img-fluid contact-logo-img"
                    src={ananas_logo}
                    alt=""
                  />
                </a>
                <a
                  className="contact-logo-link"
                  target="_blank"
                  href="https://www.facebook.com/BoostEsteemThroughTheater/"
                >
                  <img
                    className="img-fluid contact-logo-img"
                    src={bet_logo}
                    alt=""
                  />
                </a>
              </div>
              <div className="justify-content-between justify-content-md-around d-flex mt-lg-5">
                <div className="contact-logo-img"></div>
                <a
                  className="contact-logo-link"
                  target="_blank"
                  href="https://www.facebook.com/celestagroup/"
                >
                  <img
                    className="img-fluid contact-logo-img"
                    src={celesta_logo}
                    alt=""
                  />
                </a>
                <a
                  className="contact-logo-link"
                  target="_blank"
                  href="https://www.meenakaleidoskopio.com/"
                >
                  <img
                    className="img-fluid contact-logo-img"
                    src={kaleidoskopio_logo}
                    alt=""
                  />
                </a>
                <div className="contact-logo-img"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactSection;