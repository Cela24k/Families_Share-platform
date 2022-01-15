import React from "react";
import Texts from "../Constants/Texts";
import withLanguage from "./LanguageContext";

class CovidAlertReports extends React.Component {

  constructor(props) {
    super(props);
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const { profileId } = this.props;
    const myProfile = userId === profileId; // ci servirà?
    this.state = {
      myProfile,
      profileId,
    };
  }

  render() {
    // const { myProfile, profileId } = this.state;
    const { language,history } = this.props;
	const {pathname} = history.location
    const texts = Texts[language].covidAlertReports;
    return (
      <React.Fragment>
        <div className="covid-alarm-button">
          <i class="fas fa-biohazard fa-10x"></i>
          <h1>{texts.title}</h1>

          <h3>
            <i class="far fa-question-circle"></i>
            {texts.iconLabel}
          </h3>
        </div>
        <div className="healthprofileButton">
          <button 
            id="submitButton" 
            type="button" 
            className="btn btn-secondary btn-lg btn-warning" 
            onClick={() => {history.push(`${pathname}/createreport`) }}
          >
            {texts.buttonLabel}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default withLanguage(CovidAlertReports);