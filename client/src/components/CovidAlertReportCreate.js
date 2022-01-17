import React from "react";
import PropTypes from "prop-types";
import Log from "./Log";
import axios from "axios";
import withLanguage from "./LanguageContext";

import Texts from "../Constants/Texts";

class CovidAlertReportCreate extends React.Component {
    constructor(props) {
        super(props);

    }

    getMember = async () => {
        const  userId = JSON.parse(localStorage.getItem("user")).id;
        try {
            const response = await axios
                .get(`/api/users/${userId}/covidalert`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("mimmo mammo")
            Log.error(error);
            return null;
        }
    };

    render() {
        const { language, history } = this.props;
        const texts = Texts[language].CovidAlertReportCreate;
        return (
            <div>
                <div
                    id="editChildProfileHeaderContainer"
                    style={{ backgroundColor: "#00838f", height: "5rem" }}
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
                <p className="covidInformation">Assicurati di aver fatto un tampone ed esser risultato positivo prima di inviare segnalazioni. Aiutaci a prevenire il contagio :) Abbasso il Covid-19</p>
                <div className="createReportSlot">
                    <h3>Data primi sintomi</h3>
                    <div className="row no-gutters reportDataSlot" >
                        <div className="col-2-10">
                            <i className="fas fa-calendar activityInfoIcon" />
                        </div>
                        <div className="col-2-10">
                        </div>
                        <div className="col-6-10">
                            <input
                                className="expandedTimeslotTimeInputReport form-control"
                                type="date"
                                onChange={this.handleChange}
                                required
                                name="date"
                            />
                        </div>
                    </div>
                </div>

                <div className="createReportSlot">
                    <h3>Data contatto con positivo</h3>
                    <div className="row no-gutters reportDataSlot" >
                        <div className="col-2-10">
                            <i className="fas fa-calendar activityInfoIcon" />
                        </div>
                        <div className="col-2-10">
                        </div>
                        <div className="col-6-10">
                            <input
                                className="expandedTimeslotTimeInputReport form-control"
                                type="date"
                                onChange={this.handleChange}
                                required
                                name="date"
                            />
                        </div>
                    </div>
                </div>
                <div className="healthprofileButton">
                    <button
                        id="submitButton"
                        type="button"
                        className="btn btn-secondary btn-lg"
                        onClick={()=>{this.getMember()}}
                    >
                        {texts}
                    </button>
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
