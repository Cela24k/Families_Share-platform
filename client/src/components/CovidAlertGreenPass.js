import React from "react";
import axios from "axios";
// import Texts from "../Constants/Texts";
import Fab from "@material-ui/core/Fab";
import withLanguage from "./LanguageContext";
import { withStyles } from "@material-ui/core/styles";
import Log from "./Log";

class CovidAlertGreenPass extends React.Component {

	constructor(props) {
		super(props);
		const userId = JSON.parse(localStorage.getItem("user")).id;
		const { profileId, greenPass } = this.props;
		const myProfile = userId === profileId;
		// var image = document.getElementById("output");
		// image.src = URL.createObjectURL(greenPass);
		this.state = {
			myProfile,
			profileId,
		};
	}

	addGreenPass = () => {
		const { profileId } = this.state;
		const file = document.getElementById("input").files[0];
		const reader = new FileReader();
		reader.onload = () => {
			axios
				.post(`/api/users/${profileId}/health/documents`, {
					"is_child": false,
					"user_id": profileId,
					"filename": "greenpass",
					"filedata": reader.result
				})
				.then((response) => {
					window.location.reload(false);
					Log.info(response);
				})
				.catch((error) => {
					Log.error(error);
				})
		}
		reader.readAsDataURL(file);
	}

	render() {
		const { myProfile, profileId } = this.state;
		const { greenPass, classes } = this.props;
		if (greenPass !== null) {
			fetch(greenPass.file_data)
			.then(resp => resp.blob())
			.then(blob => {
				const image = document.getElementById("output");
				image.src = URL.createObjectURL(blob);
			})
			.catch(() => alert("Aaaaaah"));
		}
		// const texts = Texts[language].profileDocuments;
		return (
			<React.Fragment>
				{myProfile && greenPass !== null ? (
					<div style={divStyle}>
						<img id="output" width="350"></img>
					</div>
				) : (
					<div style={divStyle}>
						<i className="fas fa-file-upload fa-10x" style={labelStyle} />
						<input
							style={fileInput}
							id="input"
							type="file"
							onChange={this.addGreenPass}
						/>
						{myProfile && (
							<Fab
								color="primary"
								aria-label="Add"
								className={classes.add}
								onClick={() => { document.getElementById('input').click() }}
							>
								<i className="fas fa-qrcode" />
							</Fab>
						)}
					</div>
				)}
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

const fileInput = {
	opacity: 0.6,
	// "paddingLeft": "50px"
	display: "none"
}

const labelStyle = {
	opacity: 0.4
}

export default withStyles(styles)(withLanguage(CovidAlertGreenPass));