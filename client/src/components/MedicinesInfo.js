import autosize from "autosize";
import React from "react";
import Texts from "../Constants/Texts";
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
    handleMedicinesOption = () => {
        alert("da implementare");
    }



    render() {
        const { myProfile, profileId, documents } = this.state;
        // const texts = Texts[language].profileDocuments;
        return (
            <React.Fragment>
                <div className="row no-gutters medicinesInfoContainer">
                    <div className="col-2-10">
                        <i className="fas fa-solid fa-flask center" />
                    </div>
                    <div className="col-6-10 " style={divStyle}>
                        <div className="verticalCenter" >
                            <h1>Panoramica Farmaci</h1>

                        </div>
                    </div>
                    <div className="col-2-10">
                        <i className="fas fa-pencil-alt  center"
                            role="button"
                            onClick={this.handleMedicinesOption} />
                    </div>

                </div>
                {/*addare qui il calendario, la parte di sopra è da migliorare in caso */}

            </React.Fragment>
        );
    }
}

const divStyle = {
    "justifyContent":"center",
    "display" : "flex",
    "marginTop" : "1.3em"
}

const fileInput = {
    opacity: 0.5,
    "padding-left": "50px"
}

const labelStyle = {
    opacity: 0.4
}

export default withLanguage(MedicinesInfo);
