import Calendar from "./Calendar";
import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import BackNavigation from "./BackNavigation";
import withLanguage from "./LanguageContext";
import Texts from "../Constants/Texts";

const EditMedicinesProfileScreen = ({ history, language }) => {
    const handleBackNav = () => {
        history.goBack();
    };
    const texts = Texts[language].myCalendarScreen;
    const userId = JSON.parse(localStorage.getItem("user")).id;
    return (
        <React.Fragment>
            <BackNavigation title={texts.backNavTitle} onClick={handleBackNav} />
            <Calendar ownerType="user" ownerId={userId} week={true}/>
        </React.Fragment>
    );
};

EditMedicinesProfileScreen.propTypes = {
    history: PropTypes.object,
    language: PropTypes.string
};

export default withRouter(withLanguage(EditMedicinesProfileScreen));