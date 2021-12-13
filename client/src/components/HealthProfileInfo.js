import React from "react";
import axios from "axios";
// import Texts from "../Constants/Texts";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import withLanguage from "./LanguageContext";
import Log from "./Log";
import DocumentListItem from "./DocumentListItem";
import { doc } from "prettier";

class HealthProfileInfo extends React.Component {

	constructor(props) {
		super(props);
		const userId = JSON.parse(localStorage.getItem("user")).id;
		const { profileId } = this.props;
		const myProfile = userId === profileId;
		const moodText = "";
		this.state = {
			myProfile,
			profileId,
			moodText 
		};
	}

	handleText = (id) => {
		console.log(document.getElementById(id))
	}




	render() {
		const { myProfile, profileId, documents,moodText } = this.state;
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
						<i className="fas fa-chart-line center"
							role="button"
						/>
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
						onClick={this.handleText('moodAreaText')}
					></textarea>
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
						<i className="fas fa-thermometer-half center"
							role="button"
						/>
					</div>


				</div>
				<div className="textAreaHealth">
					<textarea id="moodAreaText"
						rows='3' data-min-rows='3'
						placeholder="Scrivi i tuoi sintomi giornalieri..."
						onClick={this.handleText('moodAreaText')}
					>{moodText}</textarea>
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

