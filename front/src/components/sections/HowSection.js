import React from "react";
import { useTranslation } from "react-i18next";
import "../../assets/how_section.css";
import Title from "../parts/Title";
import Modal from "../parts/Modal";
import how_img1 from "../../images/teacher_in_role.jpg";
import how_img2 from "../../images/collective_roll.jpg";
import how_img3 from "../../images/hot_sitting.jpg";
import how_img4 from "../../images/mantle_of_the_expert.jpg";
import how_img5 from "../../images/conscience_alley.jpg";
import how_img6 from "../../images/puppet.jpeg";
import how_img7 from "../../images/transformation_of_materials.jpg";
import how_img8 from "../../images/audiovisual_material.jpeg";
import how_img9 from "../../images/shadow_theatre.jpeg";
import how_img10 from "../../images/mapping.jpeg";

// while modal is active
function makeBright(el) {
  el.classList.toggle("bright");
}

// Each card: its image, and the translation-key stem under how.items.*
const cards = [
  { id: "how_img1", img: how_img1, key: "teacherInRole" },
  { id: "how_img2", img: how_img2, key: "collectiveRole" },
  { id: "how_img3", img: how_img3, key: "hotSeating" },
  { id: "how_img4", img: how_img4, key: "mantleExpert" },
  { id: "how_img5", img: how_img5, key: "conscienceAlley" },
  { id: "how_img6", img: how_img6, key: "puppet" },
  { id: "how_img7", img: how_img7, key: "transformationOfMaterials" },
  { id: "how_img8", img: how_img8, key: "audiovisualCompositionOfSpace" },
  { id: "how_img9", img: how_img9, key: "shadowTheatre" },
  { id: "how_img10", img: how_img10, key: "mapping" },
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