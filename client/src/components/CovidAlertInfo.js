import React from "react";
// import axios from "axios";
// import Texts from "../Constants/Texts";
import { withStyles } from "@material-ui/core/styles";
import withLanguage from "./LanguageContext";
// import Log from "./Log";

class CovidAlertInfo extends React.Component {

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

	render() {
		const { myProfile, profileId } = this.state;
		const { classes } = this.props;
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

export default withStyles(styles)(withLanguage(CovidAlertInfo));