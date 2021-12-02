import React from "react";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import ChildListItem from "./ChildListItem";
import Texts from "../Constants/Texts";
import withLanguage from "./LanguageContext";

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

class DocumentProfileList extends React.Component {
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

	addDocument(input) {
		let file = input.files[0];

  		let reader = new FileReader();

  		reader.readAsText(file);

  		reader.onload = function() {
    		console.log(reader.result);
  		};
	} 

	render() {
		const { classes, language } = this.props;
		const { profileId, myProfile } = this.state;
		// const texts = Texts[language].profileDocuments;
		return (
			<React.Fragment>
				<div className="addChildPrompt">Non sono stati aggiunti documenti!</div>
				{myProfile && (
					<Fab
						color="primary"
						aria-label="Add"
						className={classes.add}
						
					>
						<i className="fas fa-regular fa-plus" />
						<input type="file" onclick="addDocument(this)"></input>
					</Fab>
				)}
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(withLanguage(DocumentProfileList));