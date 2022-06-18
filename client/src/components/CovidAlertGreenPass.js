import React from "react";
import axios from "axios";
// import Texts from "../Constants/Texts";
import Fab from "@material-ui/core/Fab";
import withLanguage from "./LanguageContext";
import { withStyles } from "@material-ui/core/styles";
import Log from "./Log";
import { on } from "nodemailer/lib/xoauth2";

class CovidAlertGreenPass extends React.Component {

	constructor(props) {
		super(props);
		const userId = JSON.parse(localStorage.getItem("user")).id;
		const { profileId, greenPass } = this.props;
		const myProfile = userId === profileId;
		const loadedGP = greenPass ? true : false;

		// var image = document.getElementById("output");
		// image.src = URL.createObjectURL(greenPass);
		this.state = {
			myProfile,
			profileId,
			loadedGP
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

	handleDelete = () => {
		const { profileId } = this.state
		axios
			.delete(`/api/users/${profileId}/greenpass`, {
				"filename": "greenpass",
				"user_id": profileId,
			})
			.then(response => {
				window.location.reload(false);
				Log.info(response);
			})
			.catch(error => {
				Log.error(error);
			});
	}

	render() {
		const { myProfile, profileId, loadedGP } = this.state;
		const { greenPass, classes } = this.props;


		if (greenPass !== null) {
			fetch(greenPass.file_data)
				.then(resp => resp.blob())
				.then(blob => {
					const image = document.getElementById("output");
					image.src = URL.createObjectURL(blob);
				})
				.catch(() => alert("Errore Green Pass"));
		}
		// const texts = Texts[language].profileDocuments;
		return (
			<React.Fragment>
				{myProfile && greenPass !== null ? (
					<div style={divStyle} >
						<img id="output" width="350"></img>
						<Fab
							color="primary"
							aria-label="Add"
							className={classes.add}
							onClick={this.handleDelete}
						>
							<i className="fas fa-trash fa-1x" />

						</Fab>
					</div>
				) : (
					<div style={loadedGP ? divStyle : divStyle2}>
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
	"marginTop": "50px",
	height: "100%",
	display: "flex",
	"justifyContent": "center",
	"alignItems": "center"
}

const divStyle2 = {
	"marginTop": "140px",
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