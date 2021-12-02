import React from "react";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import ChildListItem from "./ChildListItem";
import ProfileDocuments from "./DocumentProfileList";
import Texts from "../Constants/Texts";
import withLanguage from "./LanguageContext";

const styles = () => ({
  add: {
    position: "fixed",
    bottom: "5%",
    right: "5%",
    height: "5rem",
    width: "5rem",
    borderRadius: "50%",
    border: "solid 0.5px #999",
    backgroundColor: "#ff6f00",
    zIndex: 100,
    fontSize: "2rem",
  },
});

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
              <h1>Documenti</h1>
              <h2>Visualizza/Modifica documenti</h2>
            </div>
          </div>
        </div>
        <div className="row no-gutters  profileInfoContainer">
          <div className="col-2-10">
            <i className="fas fa-solid fa-capsules center" />
          </div>
          <div className="col-8-10">
            <div
              role="button"
              className="verticalCenter"
              onClick={() => history.push(`${pathname}`)}
            >
              <h1>Medicine</h1>
              <h2>Visualizza/Modifica medicine</h2>
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
              onClick={() => history.push(`${pathname}`)}
            >
              <h1>Profilo salute</h1>
              <h2>Visualizza profilo salute</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withLanguage(ProfileHealth));

ProfileHealth.propTypes = {
  profileId: PropTypes.string,
  history: PropTypes.object,
  classes: PropTypes.object,
  language: PropTypes.string,
};
