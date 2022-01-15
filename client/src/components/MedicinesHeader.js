import React from "react";
import { withRouter } from "react-router-dom";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import withLanguage from "./LanguageContext";
import Texts from "../Constants/Texts";

class MedicinesHeader extends React.Component {
  state = {
    currentTime: "",
    optionsModalIsOpen: false,
    confirmDialogIsOpen: false,
    imageModalIsOpen: false,
  };

  componentDidMount() {
    this.loadInterval = setInterval(this.getTime(), 1000)
  }

  getTime() {
    const
      takeTwelve = n => n > 12 ? n - 12 : n,
      addZero = n => n < 10 ? "0" + n : n;

    setInterval(() => {
      let d, h, m, s, t, amPm;

      d = new Date();
      h = addZero(takeTwelve(d.getHours()));
      m = addZero(d.getMinutes());
      s = addZero(d.getSeconds());
      t = `${h}:${m}:${s}`;

      amPm = d.getHours() >= 12 ? "pm" : "am";

      this.setState({
        currentTime: t,
      });

    }, 1000);
  }

  handleImageModalOpen = () => {
    const target = document.querySelector(".ReactModalPortal");
    disableBodyScroll(target);
    this.setState({ imageModalIsOpen: true });
  };

  handleImageModalClose = () => {
    clearAllBodyScrollLocks();
    this.setState({ imageModalIsOpen: false });
  };

  render() {
    const { currentTime } = this.state;
    const { language, match, history, photo } = this.props;
    const { profileId } = match.params;
    const texts = Texts[language].medicineHeader; // questo vedere se utilizzarli o meno 
    const { imageModalIsOpen } = this.setState;
    var tempo = new Date().getSeconds();
    return (
      <div id="profileHeaderContainer" className="medicinesHeader">
        <div className="row no-gutters" id="profileHeaderOptions">
          <div className="col-2-10">
            <button
              type="button"
              className="transparentButton center"
              onClick={() => history.goBack()}
            >
              <i className="fas fa-arrow-left" />
            </button>
          </div>
          <div className="col-6-10 healthTitle">
            {texts.title}
          </div>
        </div>
        <img
          className="profilePhoto horizontalCenter"
          alt="user's profile"
          src={photo}
          onClick={this.handleImageModalOpen}
        />
        <div>
          {/*change design sopratutto il margin */}
          <h1 className="horizontalCenter" style={{ "fontSize": "16px" }}>Prossima Medicina da prendere:</h1>
          <h2 className="horizontalCenter" > {currentTime} </h2>
        </div>

      </div>
    );
  }
}

export default withRouter(withLanguage(MedicinesHeader));
