import React from "react";
import Texts from "../Constants/Texts";
import withLanguage from "./LanguageContext";

class DocumentProfileInfo extends React.Component {

	constructor(props) {
		super(props);
		const userId = JSON.parse(localStorage.getItem("user")).id;
		const { profileId, usersDocuments } = this.props;
		const myProfile = userId === profileId;
		this.state = {
			myProfile,
			documents: usersDocuments,
			profileId,
		};
	}

	readFile = () => {
		const file = document.getElementById("get-document").files[0];
		const reader = new FileReader();
		reader.onload = (event) => {
			/* qui bisognerà salvare il file dentro il db */
			console.log(event.target.result);
			const container = document.getElementById("document-data");
			container.innerHTML = event.target.result;
		};
		reader.readAsArrayBuffer(file);
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
		// const texts = Texts[language].profileDocuments;
		return (
			<React.Fragment>
				<div style={divStyle} >
					{myProfile && (
						<i class="fas fa-file-upload fa-10x"
							style={labelStyle}>
						</i>
					)}
				</div>
				<div className="addChildPrompt">
					{myProfile && (
						<input
							style={fileInput}
							id="get-document"
							type="file"
							onChange={this.readFile}
						/>
					)}
				</div>
				<div className="addChildPrompt" id="document-data" />
			</React.Fragment>
		);
	}
}

const divStyle = {
	"margin-top":"100px",
	height: "100%",
	display: "flex",
	"justify-content": "center",
	"align-items": "center"
}

const fileInput = {
	opacity: 0.5,
	"padding-left": "50px"
}

const labelStyle = {
	opacity: 0.4
}

export default withLanguage(DocumentProfileInfo);
