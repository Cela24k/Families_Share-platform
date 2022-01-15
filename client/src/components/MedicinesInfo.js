import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withLanguage from "./LanguageContext";
import Texts from "../Constants/Texts";

class MedicinesInfo extends React.Component {

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

    handleMedicinesOption = () => {
        const { history } = this.props;
        const { pathname } = history.location;
        const newPath = `${pathname}/expand`;
        history.push(newPath);
    }
    
    render() {
        const { language } = this.props;
        const texts = Texts[language].medicineInfo;
        return (
            <React.Fragment>
                <div className="row no-gutters medicinesInfoContainer" style={{ height: "30%" }}>
                    <div className="col-2-10">
                        <i className="fas fa-solid fa-flask center" />
                    </div>
                    <div className="col-6-10 ">
                        <div className="verticalCenter" >
                            <h1>{texts.medOverviewTitle}</h1>
                        </div>
                    </div>
                </div>
                <div style={{ height: "8rem", "marginBottom": "10px", "borderBottom": "1px ridge", justifyContent: "center" }}>
                    <div className="row no-gutters medicinesInfoContainer" style={{
                        "marginTop": "2rem",
                        height: "40%", opacity: 0.8, height: "2rem", justifyContent: "center", "borderBottom": "none"
                    }}>
                        <div className="col-1-10">
                        </div>
                        <div className="col-1-10" style={boxBorders}>
                            <div style={dayBannerStyle}>{texts.monday}</div>
                        </div>
                        <div className="col-1-10" style={boxBorders}>
                            <div style={dayBannerStyle}>{texts.tuesday}</div>
                        </div>
                        <div className="col-1-10" style={boxBorders}>
                            <div style={dayBannerStyle}>{texts.wednesday}</div>
                        </div>
                        <div className="col-1-10" style={boxBorders}>
                            <div style={dayBannerStyle}>{texts.thurday}</div>
                        </div>
                        <div className="col-1-10" style={boxBorders}>
                            <div style={dayBannerStyle}>{texts.friday}</div>
                        </div>
                        <div className="col-1-10" style={boxBorders}>
                            <div style={dayBannerStyle}>{texts.saturday}</div>
                        </div>
                        <div className="col-1-10" style={boxBorders}>
                            <div style={dayBannerStyle}>{texts.sunday}</div>
                        </div>
                        <div className="col-1-10" style={{opacity:0.6}}>
                        <i className="fas fa-eye center"
                            role="button"
                            onClick={this.handleMedicinesOption} />
                        </div>
                    </div>
                </div>
                <div className="row no-gutters medicinesInfoContainer" style={{justifyContent:"center"}}>
                    <div className="col-10-10">
                        <div style={{justifyContent:"center", textAlign:"center"}}>
                            <h1>Ulteriori informazioni</h1>
                            <p style={{"fontSize":"16px"}}>Premi su un giorno per visualizzare</p>
                        </div>
                    </div>
                </div>
                <div className="row no-gutters medicinesInfoContainer" style={borderStyle}>
					<div className="col-2-10">
						<i className="fas fa-solid fa-exclamation-triangle center" />
					</div>
					<div className="col-6-10 ">
						<div className="verticalCenter">
							<h1>{texts.allergiesTitle}</h1>
						</div>
					</div>
					<div className="col-2-10">
					</div>
				</div>
				<div className="textAreaHealth">
					<textarea id="allergiesAreaText"
						rows='3' data-min-rows='3'
						placeholder="Scrivi le tue allergie..."
						onChange={this.handleSubmitButton}
					>{"allergies"}</textarea>
				</div>
				<div className="healthprofileButton">
					<button 
                        id="submitButton" 
                        type="button" 
                        className="btn btn-secondary btn-lg" 
                        disabled={"disableFlag"} 
                        onClick={this.sumbitChanges}
                    >{texts.buttonLabel}
                    </button>
				</div>
            </React.Fragment>
        );
    }
}

//mettere questo in css
const medicinesContentBox = {
    height: "8rem",
    marginTop: "10px",
    marginBottom: "10px",
    borderBottom: "1px ridge",
    justifyContent: "center"
}

const borderStyle = {
	height: "30%",
	borderTop: "2px solid rgba(01, 01, 01, 0.1)",
	borderBottom: " 2px solid rgba(01, 01, 01, 0.1) ",
	marginTop: "2.5rem"
}

const boxBorders = {
    borderWidth: "1px",
    borderStyle: "ridge",
    borderColor: "#bab8b7",
}
const dayBannerStyle = {
    "textAlign": "center",
    color: "white",
    "backgroundColor": "#00838f",
}

export default withRouter(withLanguage(MedicinesInfo));