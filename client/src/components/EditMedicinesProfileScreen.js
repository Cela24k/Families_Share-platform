import Calendar from "./Calendar";
import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import BackNavigation from "./BackNavigation";
import withLanguage from "./LanguageContext";
import Texts from "../Constants/Texts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

const EditMedicinesProfileScreen = ({ history, language, match }) => {
  const handleBackNav = () => {
    history.goBack();
  };
  const handleAdd = () => {
    const { pathname } = history.location;
    const newPath = `${pathname}/add`;
    history.push(newPath);
  }
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
        <Fab
          alwaysShowTitle={true}
          mainButtonStyles={mainButtonStyles}
          icon={<FontAwesomeIcon icon={faPlus} />}
        >
          <Action
            style={actionStyles}
            text={texts.addButtonLabel}
            onClick={handleAdd}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Action>
          <Action
            style={actionStyles}
            text={texts.delButtonLabel}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Action>
        </Fab>
      )}
      <Calendar ownerType="user" ownerId={userId} week={weekly} />
    </React.Fragment>
  );
};

EditMedicinesProfileScreen.propTypes = {
  history: PropTypes.object,
  language: PropTypes.string
};

const mainButtonStyles = {
  backgroundColor: "#ff6f00",
}

const actionStyles = {
  backgroundColor: "#ff8c00",
};

export default withRouter(withLanguage(EditMedicinesProfileScreen));