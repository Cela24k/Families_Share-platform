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
				<div className="covid-alarm-button">
					<i class="fas fa-biohazard fa-10x"></i>
					<h1>Covid Alert</h1>

					<h3>
						<i class="far fa-question-circle"></i>
						Aiuta a prevenire l'espansione del virus
					</h3>
				</div>
				<div className="healthprofileButton">
					<button id="submitButton" type="button" className="btn btn-secondary btn-lg btn-warning" onClick={()=>{alert("da implementare more")}}>Invia Segnalazione</button>
				</div>
			</React.Fragment>
		);
	}
}

export default withLanguage(CovidAlertReports);