import Calendar from "./Calendar";
import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import BackNavigation from "./BackNavigation";
import withLanguage from "./LanguageContext";
import Texts from "../Constants/Texts";

const EditMedicinesProfileScreen = ({ history, language, match }) => {
  const handleBackNav = () => {
    history.goBack();
  };
  const { profileId } = match.params;
  const weekly = false
  const texts = Texts[language].editMedicineScreen;
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const myProfile = userId === profileId;
  return (
    <React.Fragment>
      <BackNavigation
        title={texts.backNavTitle}
        onClick={handleBackNav}
      />
      {myProfile && (
        <div class="row no-gutters" style={{ height: "2.5rem", justifyContent: "center", backgroundColor: "#F0F0F0" }} >
          <div className="col-8-10" />
          <div className="col-1-10">
            <i className="fas fa-plus center"
              role="button"
              onClick={() => {
                const { pathname } = history.location;
                const newPath = `${pathname}/add`;
                history.push(newPath);
              }}
            />
          </div>
          <div className="col-1-10">
            <i className="fas fa-minus-circle center"
              role="button"
              onClick={() => { }}
            />
          </div>
        </div>
      )}
      <Calendar ownerType="user" ownerId={userId} week={weekly} />
    </React.Fragment>
  );
};

EditMedicinesProfileScreen.propTypes = {
  history: PropTypes.object,
  language: PropTypes.string
};

export default withRouter(withLanguage(EditMedicinesProfileScreen));