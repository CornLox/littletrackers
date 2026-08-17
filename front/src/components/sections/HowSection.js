import React from "react";
import { useTranslation } from "react-i18next";
import "../../assets/how_section.css";
import Title from "../parts/Title";
import Modal from "../parts/Modal";
import how_img1 from "../../images/collective_space.jpeg";
import how_img2 from "../../images/teacher_in_role.jpg";
import how_img3 from "../../images/collective_roll.jpg";
import how_img4 from "../../images/hot_sitting.jpg";
import how_img5 from "../../images/mantle_of_the_expert.jpg";
import how_img6 from "../../images/conscience_alley.jpg";

// while modal is active
function makeBright(el) {
  el.classList.toggle("bright");
}

// Each card: its image, and the translation-key stem under how.items.*
const cards = [
  { id: "how_img1", img: how_img1, key: "collectiveSpace" },
  { id: "how_img2", img: how_img2, key: "teacherInRole" },
  { id: "how_img3", img: how_img3, key: "collectiveRole" },
  { id: "how_img4", img: how_img4, key: "hotSeating" },
  { id: "how_img5", img: how_img5, key: "mantleExpert" },
  { id: "how_img6", img: how_img6, key: "conscienceAlley" },
];

function HowSection() {
  const { t } = useTranslation();
  return (
    <>
      <section id="how-section">
        <div className="container">
          <Title title={t("how.title")} hrId="how-section-hr" />
          <div className="row">
            {cards.map((card) => {
              const title = t(`how.items.${card.key}.title`);
              const text = t(`how.items.${card.key}.text`);
              return (
                <div key={card.id} className="col-lg-4 mt-4">
                  <div
                    onClick={(e) => makeBright(e.currentTarget)}
                    className="card rounded-0"
                  >
                    <img
                      className="card-img-top img-fluid rounded-0"
                      src={card.img}
                      data-bs-toggle="modal"
                      data-bs-target={"#" + card.id + "-modal"}
                      alt={title}
                    />
                    <div className="card-body">
                      <p className="card-text">{title}</p>
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