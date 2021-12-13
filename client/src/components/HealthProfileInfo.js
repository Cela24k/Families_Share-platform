import React from "react";
import axios from "axios";
// import Texts from "../Constants/Texts";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import withLanguage from "./LanguageContext";
import Log from "./Log";
import DocumentListItem from "./DocumentListItem";

class HealthProfileInfo extends React.Component {

	constructor(props) {
		super(props);
		const userId = JSON.parse(localStorage.getItem("user")).id;
		const { profileId } = this.props;
		const myProfile = userId === profileId;
		this.state = {
			myProfile,
			profileId
		};
	}

	


	render() {
		const { myProfile, profileId, documents } = this.state;
		const { classes } = this.props;
		// const texts = Texts[language].profileDocuments;
		return (
			<React.Fragment>
				
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

