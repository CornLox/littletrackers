import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../assets/about_page_section.css";
import Title from "../parts/Title";
import Modal from "../parts/Modal";
import { localizedField, resolveLang } from "../../utils/localizedField";
import API_BASE from "../../config";

const API_MEMBERS_URL = `${API_BASE}/api/members`;

function AboutPageSection() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language && i18n.language.startsWith("en") ? "en" : "el";

  const [members, setMembers] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(API_MEMBERS_URL);
        const json = await response.json();
        if (response.ok) {
          setMembers(json);
        }
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };
    fetchMembers();
  }, []);

  // Alphabetical order by Greek surname, regardless of the UI language.
  const sortedMembers = useMemo(() => {
    if (!members) return null;
    return [...members].sort((a, b) =>
      (a.surname_el || "").localeCompare(b.surname_el || "", "el")
    );
  }, [members]);

  return (
    <>
      <section id="about-page-section">
        <div className="container polaroid-container">
          <Title title={t("team.title")} hrId="about-page-section-hr" />
          <div className="row wrapper justify-content-around">
            {sortedMembers &&
              sortedMembers.map((member) => (
                <div key={member._id} className="col-12 col-md-6 col-lg-4 item">
                  <div
                    className="polaroid btn-link text-reset text-decoration-none"
                    role="button"
                    tabIndex={0}
                    data-bs-toggle="modal"
                    data-bs-target={"#team-" + member._id + "-modal"}
                  >
                    <div>
                      <img src={`${API_MEMBERS_URL}/${member._id}/photo`} alt={`${localizedField(member, "forename", lang)} ${localizedField(member, "surname", lang)}`} />
                      <div className="caption">
                        <h5>{`${localizedField(member, "forename", lang)} ${localizedField(member, "surname", lang)}`}</h5>
                        <h5>{localizedField(member, "role", lang)}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Modals live OUTSIDE .item: a transform/filter ancestor would trap a
          position:fixed modal and stop it covering the page. */}
      {sortedMembers &&
        sortedMembers.map((member) => (
          <Modal
            key={member._id}
            modal_id={"team-" + member._id}
            modal_class="team-modal"
            modal_img={`${API_MEMBERS_URL}/${member._id}/photo`}
            modal_title={`${localizedField(member, "forename", lang)} ${localizedField(member, "surname", lang)}`}
            modal_subtitle={localizedField(member, "role", lang)}
            modal_txt={localizedField(member, "cv", lang)}
          />
        ))}
    </>
  );
}

export default AboutPageSection;