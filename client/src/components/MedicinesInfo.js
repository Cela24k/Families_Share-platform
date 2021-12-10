import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withLanguage from "./LanguageContext";

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
    // TODO: scoprire perchè history non funziona 
    handleMedicinesOption = () => {
        const { history } = this.props;
        const { pathname } = history.location;
        const newPath = `${pathname}/edit`;
        history.push(newPath);
    }

    render() {
        const { myProfile, profileId, documents } = this.state;
        // const texts = Texts[language].profileDocuments;
        return (
            <React.Fragment>
                <div className="row no-gutters medicinesInfoContainer" style={{ height: "30%" }}>
                    <div className="col-2-10">
                        <i className="fas fa-solid fa-flask center" />
                    </div>
                    <div className="col-6-10 ">
                        <div className="verticalCenter" >
                            <h1>Panoramica Farmaci</h1>
                        </div>
                    </div>
                    <div className="col-2-10">
                        <i className="fas fa-pencil-alt center"
                            role="button"
                            onClick={this.handleMedicinesOption} />
                    </div>
                </div>
                <div style={{ height: "8rem", "marginBottom": "10px", "borderBottom": "1px ridge", justifyContent: "center" }}>
                    <div className="row no-gutters medicinesInfoContainer" style={{
                        "marginTop": "2rem",
                        height: "40%", opacity: 0.8, height: "2rem", justifyContent: "center", "borderBottom": "none"
                    }}>
                        <div className="col-1-10" style={boxBorders}>
                            <div style={dayBannerStyle}>LUN</div>
                        </div>
                        <div className="col-1-10" style={boxBorders}>
                            <div style={dayBannerStyle}>MAR</div>
                        </div>
                        <div className="col-1-10" style={boxBorders}>
                            <div style={dayBannerStyle}>MER</div>
                            <p>i</p>
                        </div>
                        <div className="col-1-10" style={boxBorders}>
                            <div style={dayBannerStyle}>GIO</div>
                        </div>
                        <div className="col-1-10" style={boxBorders}>
                            <div style={dayBannerStyle}>VEN</div>
                        </div>
                        <div className="col-1-10" style={boxBorders}>
                            <div style={dayBannerStyle}>SAB</div>
                        </div>
                        <div className="col-1-10" style={boxBorders}>
                            <div style={dayBannerStyle}>DOM</div>
                        </div>
                    </div>
                </div>
                <div className="row no-gutters medicinesInfoContainer" style={{justifyContent:"center"}}>
                    <div className="col-10-10">
                        <h1>Ulteriori informazioni</h1>
                        <i style={{"fontSize":"16px", justifyContent:"center"}}>Premi su un giorno per visualizzare</i>
                    </div>
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
// prima export default withLanguage(MedicinesInfo);
