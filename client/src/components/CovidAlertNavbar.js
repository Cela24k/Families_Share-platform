import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Texts from "../Constants/Texts";
import withLanguage from "./LanguageContext";

const CovidAlertNavbar = ({ language, history }) => {
  const handleActiveTab = event => {
    const { pathname } = history.location;
    const parentPath = pathname.slice(0, pathname.lastIndexOf("/"));
    history.replace(`${parentPath}/${event.target.id}`);
  };
  const texts = Texts[language].covidAlertNavbar;
  const { pathname } = history.location;
  const activeTab = pathname.slice(
    pathname.lastIndexOf("/") + 1,
    pathname.length
  );
  return (
    <div id="profileNavbarContainer">
      <div className="row no-gutters">
        <div className="col-1-2">
          <h1
            id="reports"
            className={activeTab === "reports" ? "profileTabActive" : ""}
            onClick={handleActiveTab}
          >
            {texts.reports}
          </h1>
        </div>
        <div className="col-1-2">
          <h1
            id="greenpass"
            className={activeTab === "greenpass" ? "profileTabActive" : ""}
            onClick={handleActiveTab}
          >
            {texts.greenpass}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default withRouter(withLanguage(CovidAlertNavbar));

CovidAlertNavbar.propTypes = {
  language: PropTypes.string,
  history: PropTypes.object
};
