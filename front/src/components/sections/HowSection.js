import React from "react";
import { useTranslation } from "react-i18next";
import "../../assets/how_section.css";
import Title from "../parts/Title";
import Modal from "../parts/Modal";
import how_img1 from "../../images/the_first_trace.jpeg";
import how_img2 from "../../images/thresholds_and_transitions.jpeg";
import how_img3 from "../../images/materials_reimagined.jpg";
import how_img4 from "../../images/the_facilitator_performer.jpeg";
import how_img5 from "../../images/collective_roles.jpg";
import how_img6 from "../../images/the_role_of_expert.jpg";
import how_img7 from "../../images/mapping.jpeg";
import how_img8 from "../../images/multimodal_environments.jpeg";
import how_img9 from "../../images/through_the_puppet.jpeg";
import how_img10 from "../../images/shadow_theatre.jpeg";
import how_img11 from "../../images/contemporary_contexts.jpeg";
import how_img12 from "../../images/allegories.jpeg";

// while modal is active
function makeBright(el) {
  el.classList.toggle("bright");
}

// Each card: its image, and the translation-key stem under how.items.*
const cards = [
  
  { id: "how_img1", img: how_img1, key: "thefirsttrace" },
  { id: "how_img2", img: how_img2, key: "thresholdsandtransitions" },
  { id: "how_img3", img: how_img3, key: "materialsreimagined" },
  { id: "how_img4", img: how_img4, key: "thefacilitatorperformer" },
  { id: "how_img5", img: how_img5, key: "collectiveroles" },
  { id: "how_img6", img: how_img6, key: "theroleofexpert" },
  { id: "how_img7", img: how_img7, key: "mapping" },
  { id: "how_img8", img: how_img8, key: "multimodalenvironments" },
  { id: "how_img9", img: how_img9, key: "throughthepuppet" },
  { id: "how_img10", img: how_img10, key: "shadowtheatre" },
  { id: "how_img11", img: how_img11, key: "contemporarycontexts" },
  { id: "how_img12", img: how_img12, key: "allegories" }

];
function HowSection() {
  const { t } = useTranslation();
  return (
    <>
      <section id="how-section">
        <div className="container">
          <Title title={t("how.title")} hrId="how-section-hr" />
          <div className="row justify-content-center">
            {cards.map((card) => {
              const title = t(`how.items.${card.key}.title`);
              const text = t(`how.items.${card.key}.text`);
              return (
                <div key={card.id} className="col-md-6 col-lg-4 mt-4">
                  <div
                    onClick={(e) => makeBright(e.currentTarget)}
                    className="card rounded-0"
                     data-bs-toggle="modal"
                      data-bs-target={"#" + card.id + "-modal"}
                  >
                    <img
                      className="card-img-top img-fluid rounded-0"
                      src={card.img}
                     
                      alt={title}
                    />
                    <div className="card-body">
                      <p className="card-text">{title} <span className="click-span">{'\u203A'}</span></p>
                    </div>
                    <Modal
                      modal_id={card.id}
                      modal_title={title}
                      modal_txt={text}
                      modal_img={card.img}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default HowSection;