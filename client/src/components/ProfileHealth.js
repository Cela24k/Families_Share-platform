import React from "react";
import Texts from "../Constants/Texts";
import withLanguage from "./LanguageContext";

class ProfileHealth extends React.Component {

  constructor(props) {
    super(props);
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const { profileId } = this.props;
    const myProfile = userId === profileId;
    this.state = {
      myProfile,
      profileId,
    };
  }

  render() {
    const { history, language } = this.props;
    const { pathname } = history.location; // current location
    const texts = Texts[language].profileHealth;
    return (
      <div>
        <div className="row no-gutters profileInfoContainer">
          <div className="col-2-10">
            <i className="fas fa-solid fa-file center" />
          </div>
          <div className="col-8-10">
            <div
              role="button"
              className="verticalCenter"
              onClick={() => history.push(`${pathname}/documents`)}
            >
              <h1>{texts.documentTitle}</h1>
              <h2>{texts.documentSubTitle}</h2>
            </div>
          </div>
        </div>

        <div className="row no-gutters  profileInfoContainer">
          <div className="col-2-10">
            <i className="fas fa-solid fa-user center" />
          </div>
          <div className="col-8-10">
            <div
              role="button"
              className="verticalCenter"
              onClick={() => history.push(`${pathname}/healthprofile`)}
            >
              <h1>{texts.healthProfileTitle}</h1>
              <h2>{texts.healthProfileSubTitle}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withLanguage(ProfileHealth);
