import React from "react";
import axios from "axios";
// import Texts from "../Constants/Texts";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import withLanguage from "./LanguageContext";
import Log from "./Log";
import DocumentListItem from "./DocumentListItem";
import { doc } from "prettier";

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
			mood: { text: "", rate: "" },
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
			healthprofile: undefined
		};
	}

	async componentDidMount() {
		const { profileId } = this.state;

		const healthprofile = await getMyHealthProfile(profileId);
		this.setState({ healthprofile })
		
	}

	//questa funzione mi returna il contenuto delle text area che verrà letto solo una volta finito di fare le modifiche
	retrieveHealthProfileInfo = () => {
		const moodtext = document.getElementById("moodAreaText").value
		const symptomstext = document.getElementById("symptomsAreaText").value
		const allergiestext = document.getElementById("allergiesAreaText").value

		return { "moodtext": moodtext, "symptomstext": symptomstext, "allergiestext": allergiestext }
	}



	
	postData = () => {
		const { profileId } = this.state
		const info = this.retrieveHealthProfileInfo()
		axios
			.post(`/api/users/${profileId}/health/healthprofile`, {
				"mood": { "text": info.moodtext, "mood": "" },
				"sintomi": info.symptomstext,
				"allergies": info.allergiestext

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
		const { myProfile, profileId, healthprofile } = this.state;
		const { classes } = this.props;

		// const texts = Texts[language].profileDocuments;
		return (
			<React.Fragment>
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
					<i className="far fa-sad-cry fa-3x" onClick={this.handleSmile} />
					<i className="far fa-sad-tear fa-3x" onClick={this.handleSmile} />
					<i className="far fa-meh fa-3x" onClick={this.handleSmile} />
					<i className="far fa-smile-beam fa-3x" onClick={this.handleSmile} />
					<i className="far fa-grin-beam fa-3x" onClick={this.handleSmile} />
				</div>
				<div className="textAreaHealth">
					<textarea id="moodAreaText"
						rows='3' data-min-rows='3'
						placeholder="Scrivi il tuo mood..."
					></textarea>
				</div>
				<button type="button" class="btn btn-primary" onClick={this.postData}>Submit</button>

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
					></textarea>
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
					></textarea>
				</div>


			</React.Fragment>
		);
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

