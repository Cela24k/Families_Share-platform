import React from "react";
// import axios from "axios";
// import Texts from "../Constants/Texts";
import withLanguage from "./LanguageContext";
// import Log from "./Log";

class CovidAlertReports extends React.Component {

	constructor(props) {
		super(props);
		const userId = JSON.parse(localStorage.getItem("user")).id;
		const { profileId } = this.props;
		const myProfile = userId === profileId; // ci servirà?
		this.state = {
			myProfile,
			profileId,
		};
	}

	render() {
		// const { myProfile, profileId } = this.state;
		// const { classes } = this.props;
		// const texts = Texts[language].profileDocuments;
		return (
			<React.Fragment>
                <div style={divStyle} >
                    <i className="fas fa-file-upload fa-10x" style={labelStyle} />
                </div>
			</React.Fragment>
		);
	}
}

const divStyle = {
	"marginTop": "100px",
	height: "100%",
	display: "flex",
	"justifyContent": "center",
	"alignItems": "center"
}

const labelStyle = {
	opacity: 0.4
}

export default withLanguage(CovidAlertReports);