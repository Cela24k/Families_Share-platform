import React from "react";
import PropTypes from "prop-types";
import Log from "./Log";
import axios from "axios";
import withLanguage from "./LanguageContext";
import ConfirmDialog from "./ConfirmDialog";
import Texts from "../Constants/Texts";

class CovidAlertReportCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpened: false,
            datePopup: false
        }
    }

    getMember = async () => {
        const { history } = this.state
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const sintomiDate = new Date(document.getElementById('sintomi').value);
        const positivoDate = new Date(document.getElementById('positivo').value);
        const date = sintomiDate!="Invalid Date" ?(positivoDate!="Invalid Date" ?(sintomiDate < positivoDate? positivoDate : sintomiDate): sintomiDate):positivoDate
        
        if(date=="Invalid Date")
        {
            this.setState({datePopup:true})
        }
        else{
            this.setState({datePopup:false})
            try {
                const response = await axios
                    .post(`/api/users/${userId}/covidalert`, {
                        date: date
                      });
                history.goBack();
            } catch (error) {
                Log.error(error);
                return null;
            }
        } 
    };

    handleConfirmDialogOpen() {
        this.setState({isModalOpened: true });
    };

    handleConfirmDialogClose = choice => {
        if (choice === "agree") {
            this.getMember();
        }
        this.setState({isModalOpened: false });
    }

    render() {
        const { language, history } = this.props;
        const { datePopup } = this.state;
        const texts = Texts[language].CovidAlertReportCreate;
        return (
            <div>
                <div
                    id="editChildProfileHeaderContainer"
                    style={{ backgroundColor: "#00838f", height: "5rem" }}
                >
                <ConfirmDialog
                    isOpen={this.state.isModalOpened}
                    title={"texts.confirmDialogTitle"}
                    handleClose={this.handleConfirmDialogClose}
                />
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
                                id="sintomi"
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
                                id="positivo"
                                className="expandedTimeslotTimeInputReport form-control"
                                type="date"
                                onChange={this.handleChange}
                                required
                                name="date"
                            />
                        </div>
                    </div>
                </div>
                {datePopup ? (
                    <div style={{color:"red",textAlign:"center",marginTop:"1rem"}}>
                        Inserire una data adeguata
                    </div>
                ) : (<div></div>)}
                <div className="healthprofileButton">
                    <button
                        id="submitButton"
                        type="button"
                        className="btn btn-secondary btn-lg"
                        onClick={() => this.handleConfirmDialogOpen()}
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
