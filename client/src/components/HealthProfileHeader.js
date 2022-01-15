import React from "react";
import { withRouter } from "react-router-dom";
import withLanguage from "./LanguageContext";
import Texts from "../Constants/Texts";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import ExpandedImageModal from "./ExpandedImageModal";

class HealthProfileHeader extends React.Component {

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
    handleSmile = (element) => {
        alert("da implementare");

    };

    handleBackNav = () => {
        const { history } = this.props;
        history.goBack();
    };

    render() {
        const { language, match, history, photo, name } = this.props;
        const { profileId } = match.params;
        const texts = Texts[language].healthProfileHeader;
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
                    <div className="col-6-10 healthTitle">
                        {texts.title}
                    </div>
                    <div className="col-2-10" > </div>

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

export default withRouter(withLanguage(HealthProfileHeader));
