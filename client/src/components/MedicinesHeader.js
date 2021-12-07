import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import withLanguage from "./LanguageContext";
import Texts from "../Constants/Texts";
import Log from "./Log";
import ConfirmDialog from "./ConfirmDialog";
import ExpandedImageModal from "./ExpandedImageModal";
import OptionsModal from "./OptionsModal";


class MedicinesHeader extends React.Component {
  state = {
    optionsModalIsOpen: false,
    confirmDialogIsOpen: false,
    imageModalIsOpen: false,
  };

  handleImageModalOpen = () => {
    const target = document.querySelector(".ReactModalPortal");
    disableBodyScroll(target);
    this.setState({ imageModalIsOpen: true });
  };

  handleImageModalClose = () => {
    clearAllBodyScrollLocks();
    this.setState({ imageModalIsOpen: false });
  };
  // da inziare by mimmo 
  handleEdit = () => {
    alert("Devo essere implementato");
  };

  handleOptions = () => {
    alert("Devo essere implementato");
  };



  render() {
    const { language, match, history, photo } = this.props;
    const { profileId } = match.params;
    const texts = Texts[language].profileHeader; // questo vedere se utilizzarli o meno 
    const { imageModalIsOpen } = this.setState;

    return (
      <div id="profileHeaderContainer">
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
          <div className="col-6-10" />
          {profileId === JSON.parse(localStorage.getItem("user")).id ? ( //todo bisogna vedere in che modo viene settato lo user nel localStorage
            <React.Fragment>
              <div className="col-1-10">
                <button
                  type="button"
                  className="transparentButton center"
                  onClick={this.handleEdit}
                >
                  <i className="fas fa-pencil-alt" />
                </button>
              </div>
              <div className="col-1-10">
                <button
                  type="button"
                  className="transparentButton center"
                  onClick={this.handleOptions}
                >
                  <i className="fas fa-ellipsis-v" />
                </button>
              </div>
            </React.Fragment>
          ) : (
            <div />
          )}
        </div>
        <img
          className="profilePhoto horizontalCenter"
          alt="user's profile"
          src={photo}
          onClick={this.handleImageModalOpen}
        />
        <h1 className="horizontalCenter">Prossima Medicina da prendere</h1>

      </div>
    );
  }
}

export default withRouter(withLanguage(MedicinesHeader));
