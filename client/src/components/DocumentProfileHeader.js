import React from "react";
import { withRouter } from "react-router-dom";
import withLanguage from "./LanguageContext";
import Texts from "../Constants/Texts";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import OptionsModal from "./OptionsModal";
import ConfirmDialog from "./ConfirmDialog";
import ExpandedImageModal from "./ExpandedImageModal";

class DocumentProfileHeader extends React.Component {
    
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

    handleEdit = () => {
        alert("da implementare");
    };

    handleOptions = () => {
        alert("da implementare");
    };

    handleBackNav = () => {
        const { history } = this.props;
        history.goBack();
    };

    render() {
        const { language, match, history, photo, name } = this.props;
        const { profileId } = match.params;
        // const texts = Texts[language].profileHeader;
        const { imageModalIsOpen } = this.state;
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
                <img
                    className="profilePhoto horizontalCenter"
                    alt="user's profile"
                    src={photo}
                    onClick={this.handleImageModalOpen}
                />
                <h1 className="horizontalCenter">{name}</h1>
                <ExpandedImageModal
                    isOpen={imageModalIsOpen}
                    handleClose={this.handleImageModalClose}
                    image={photo}
                />
            </div>
        );
    }
}

export default withRouter(withLanguage(DocumentProfileHeader));
