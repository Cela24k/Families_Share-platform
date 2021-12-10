import React from "react";
import axios from "axios";
import Texts from "../Constants/Texts";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import withLanguage from "./LanguageContext";
import Log from "./Log";
import DocumentListItem from "./DocumentListItem";

class DocumentProfileInfo extends React.Component {

	constructor(props) {
		super(props);
		const userId = JSON.parse(localStorage.getItem("user")).id;
		const { profileId, userDocuments } = this.props;
		const myProfile = userId === profileId;
		this.state = {
			myProfile,
			documents: userDocuments,
			profileId,
		};
	}

	readFile = () => {
		const { profileId } = this.state;
		const file = document.getElementById("input").files[0];
		const reader = new FileReader();
		reader.onload = () => {
			console.log(file.name);
			console.log(reader.result);
			const form = new FormData();
			form.append('file_name', file.name);
			form.append('file_data', reader.result);
			axios
				.post(`/api/users/${profileId}/health/documents`, form, {
					headers: { "Content-Type": "multipart/form-data" }
				})
				.then((response) => {
					Log.info(response);
				})
				.catch((error) => {
					Log.error(error);
				})
		}
		reader.readAsDataURL(file);
	};

	//implementare il size massimo di 256MB o quello che era
	//come parametro number ci va file.size
	returnFileSize(number) {
		if (number < 1024) {
			return number + 'bytes';
		} else if (number >= 1024 && number < 1048576) {
			return (number / 1024).toFixed(1) + 'KB';
		} else if (number >= 1048576) {
			return (number / 1048576).toFixed(1) + 'MB';
		}
	}

	render() {
		const { myProfile, profileId, documents } = this.state;
		const { classes } = this.props;
		// const texts = Texts[language].profileDocuments;
		return (
			<React.Fragment>
				{myProfile && documents.length > 0 ? (
					<ul>
						{documents.map((_document, index) => (
							<li key={index}>
								<DocumentListItem userId={profileId} />
							</li>
						))}
					</ul>
				) : (
					<div style={divStyle} >
						<i className="fas fa-file-upload fa-10x" style={labelStyle} />
					</div>
				)}
				<div className="addChildPrompt">
					<input
						style={fileInput}
						id="input"
						type="file"
						onChange={this.readFile}
					/>
					{myProfile && (
						<Fab
							color="primary"
							aria-label="Add"
							className={classes.add}
							onClick={() => { document.getElementById('input').click() }}
						>
							<i className="fas fa-solid fa-file" />
						</Fab>
					)}
				</div>
				<div className="addChildPrompt" id="document-data" />
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
	// opacity: 0.5,
	// "paddingLeft": "50px"
	display: "none"
}

const labelStyle = {
	opacity: 0.4
}

export default withStyles(styles)(withLanguage(DocumentProfileInfo));

