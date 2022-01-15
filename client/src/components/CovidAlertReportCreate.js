import React from "react";
import PropTypes from "prop-types";

import withLanguage from "./LanguageContext";

import Texts from "../Constants/Texts";

class CovidAlertReportCreate extends React.Component {
    constructor(props) {
        super(props);
    }
    handleAcceptTerms = () => {
        const { acceptTerms } = this.state;
        const { language } = this.props;
        const elem = document.getElementById("acceptTermsCheckbox");
        elem.checked = !acceptTerms;
        if (!acceptTerms) {
            elem.setCustomValidity("");
        } else {
            elem.setCustomValidity(Texts[language].createChildScreen.acceptTermsErr);
        }
        this.setState({ acceptTerms: !acceptTerms });
    };

    render() {
        const { language, history } = this.props;
        const texts = Texts[language].CovidAlertReportCreate;
        return (
            <div>
                <div
                    id="editChildProfileHeaderContainer"
                    style={{ backgroundColor: "green", height: "5rem" }}
                >
                    <div className="row no-gutters" id="profileHeaderOptions">
                        <div className="col-2-10">
                            <button
                                type="button"
                                className="transparentButton center"
                                onClick={() => history.goBack()}
                            >
                                <i className="fas fa-times" />
                            </button>
                        </div>
                        <div className="col-6-10">
                            <h1 className="verticalCenter">Mimmo</h1>
                        </div>
                        <div className="col-2-10">
                            <button
                                type="button"
                                className="transparentButton center"
                                onClick={this.handleSave}
                            >
                                <i className="fas fa-check" />
                            </button>
                        </div>
                    </div>

                </div>
                <div className="createReportSlot">
                    <div className="row no-gutters" >
                        <div className="col-2-10">
                            <i className="fas fa-calendar activityInfoIcon" />
                        </div>
                        <div className="col-2-10">
                            <div className="activityInfoDescription">mimmo</div>
                        </div>
                        <div className="col-6-10">
                            <input
                                className="expandedTimeslotTimeInput form-control"
                                type="date"
                                onChange={this.handleChange}
                                required
                                name="date"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withLanguage(CovidAlertReportCreate);

CovidAlertReportCreate.propTypes = {
    activityName: PropTypes.string,
    activityLocation: PropTypes.string,
    dates: PropTypes.array,
    handleSubmit: PropTypes.func,
    activityTimeslots: PropTypes.array,
    differentTimeslots: PropTypes.bool,
    language: PropTypes.string,
    activityLink: PropTypes.string
};
