import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import withLanguage from "./LanguageContext";
import Texts from "../Constants/Texts";
import Log from "./Log";

class ProfileDocumentsHeader extends React.Component {

    // da aggiungere...

    handleEdit = () => {

    }

    handleOptions = () => {

    }

    render() {
        const { language, history, match } = this.props;
        const { profileId } = match.params;
        // const texts = Texts[language].ProfileDocumentHeader;
        return (
            <React.Fragment>
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
                        {profileId === JSON.parse(localStorage.getItem("user")).id ? (
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
                    <i className="fas fa-solid fa-file center" />
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(withLanguage(ProfileDocumentsHeader));
