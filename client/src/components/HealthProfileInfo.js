import React from "react";
import axios from "axios";
// import Texts from "../Constants/Texts";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import withLanguage from "./LanguageContext";
import Log from "./Log";
import LoadingSpinner from "./LoadingSpinner";

const getMyHealthProfile = async (userId) => {
	try {
		const response = await axios
			.get(`/api/users/${userId}/health/healthprofile`);
		return response.data;
	} catch (error) {
		Log.error(error);
		return {
			health_id: "",
			user_id: userId,
			mood: { text: "", rate: 0 },
			sintomi: "",
			allergies: "",
			day: ""
		};
	}
};

class HealthProfileInfo extends React.Component {

	constructor(props) {
		super(props);
		const userId = JSON.parse(localStorage.getItem("user")).id;
		const { profileId } = this.props;
		const myProfile = userId === profileId;

		this.state = {
			myProfile,
			profileId,
			disableFlag: true,
			fetchedProfile: false,
			healthprofile: {
				health_id: "",
				user_id: userId,
				mood: { text: "", rate: 0 },
				sintomi: "",
				allergies: ""
			}
		};

	}

	async componentDidMount() {
		const { profileId } = this.state;

		const healthprofile = await getMyHealthProfile(profileId);
		this.setState({

			fetchedProfile: true,
			healthprofile
		})
	}

	handleSubmitButton = () => {
		const disableFlag = false;
		this.setState({ disableFlag })
	}



	//questa funzione mi returna il contenuto delle text area che verrà letto solo una volta finito di fare le modifiche
	retrieveHealthProfileInfo = () => {
		const moodtext = document.getElementById("moodAreaText").value
		const symptomstext = document.getElementById("symptomsAreaText").value
		const allergiestext = document.getElementById("allergiesAreaText").value

		return { "moodtext": moodtext, "symptomstext": symptomstext, "allergiestext": allergiestext }
	}

	handleSmile = (event) => {
		this.setState({ mood: { rate: event } })
	}

	getColorRate = (event) => {
		const { healthprofile } = this.state.healthprofile
		if (!healthprofile.mood.rate || healthprofile.mood.rate === event) { // vedere perchè qui mi da undefined
			return "#C8C8C8";
		} else {
			return "#f7931e";
		}
	}

	// TODO da fare update 
	sumbitChanges = () => {
		const { profileId, healthprofile, onModifyText } = this.state
		const { moodtext, symptomstext, allergiestext } = this.retrieveHealthProfileInfo()
		axios
			.post(`/api/users/${profileId}/health/healthprofile`, {
				"mood": { "text": moodtext, "rate": healthprofile.mood.rate },
				"sintomi": symptomstext,
				"allergies": allergiestext
			})
			.then((response) => {
				window.location.reload(false);
				Log.info(response);
			})
			.catch((error) => {
				Log.error(error);
			})
	}

	render() {
		const { healthprofile, fetchedProfile, disableFlag } = this.state;
		// const texts = Texts[language].profileDocuments;
		return fetchedProfile ? (
			<React.Fragment >
				<div className="row no-gutters medicinesInfoContainer" style={{ height: "30%" }}>
					<div className="col-2-10">
						<i className="far fa-solid fa-smile center" />
					</div>
					<div className="col-6-10 ">
						<div className="verticalCenter">
							<h1>Il tuo mood</h1>
						</div>
					</div>
					<div className="col-2-10">
						<i className="fas fa-chart-line center" />
					</div>
				</div>
				<div className="feedbackContainer">
					<i id="1" className="far fa-sad-cry fa-3x" onClick={() => { }} />
					<i id="2" className="far fa-sad-tear fa-3x" onClick={this.handleSmile} />
					<i id="3" className="far fa-meh fa-3x" onClick={this.handleSmile} />
					<i id="4" className="far fa-smile-beam fa-3x" onClick={this.handleSmile} />
					<i id="5" className="far fa-grin-beam fa-3x" onClick={this.handleSmile} />
				</div>
				<div className="textAreaHealth">
					<textarea id="moodAreaText"
						rows='3' data-min-rows='3'
						placeholder="Scrivi il tuo mood..."
						onChange={this.handleSubmitButton}
					>{healthprofile.mood.text}</textarea>
				</div>

				<div className="row no-gutters medicinesInfoContainer" style={{ height: "30%" }}>
					<div className="col-2-10">
						<i className="fas fa-solid fa-exclamation center" />
					</div>
					<div className="col-6-10 ">
						<div className="verticalCenter">
							<h1>Sintomi</h1>
						</div>
					</div>
					<div className="col-2-10">
						<i className="fas fa-thermometer-half center" />
					</div>
				</div>
				<div className="textAreaHealth">
					<textarea id="symptomsAreaText"
						rows='3' data-min-rows='3'
						placeholder="Scrivi i tuoi sintomi giornalieri..."
						onChange={this.handleSubmitButton}
					>{healthprofile.sintomi}</textarea>
				</div>

				<div className="row no-gutters medicinesInfoContainer" style={{ height: "30%" }}>
					<div className="col-2-10">
						<i className="fas fa-solid fa-exclamation-triangle center" />
					</div>
					<div className="col-6-10 ">
						<div className="verticalCenter">
							<h1>Allergie</h1>
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
					>{healthprofile.allergies}</textarea>
				</div>
				<div className="healthprofileButton">
					<button id="submitButton" type="button" className="btn btn-secondary btn-lg " disabled={disableFlag} onClick={this.sumbitChanges}>Invia Modifiche</button>
				</div>
			</React.Fragment>
		) : (<LoadingSpinner />);
	}
}

const styles = () => ({
	add: {
		position: "fixed",
		bottom: "5%",
		right: "5%",
		height: "5rem",
		width: "5rem",
		borderRadius: "50%",
		border: "solid 0.5px #999",
		backgroundColor: "#ff6f00",
		zIndex: 100,
		fontSize: "2rem",
	},
});

export default withStyles(styles)(withLanguage(HealthProfileInfo));
