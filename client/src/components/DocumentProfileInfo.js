import React from "react";
import axios from "axios";
import Texts from "../Constants/Texts";
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
		const file = document.getElementById("get-document").files[0];
		const reader = new FileReader();
		reader.onload = () => {
			const bodyFormData = new FormData();
			bodyFormData.append('file_name', file.name);
			bodyFormData.append('file_data', reader.result);
			axios
				.post(`/api/users/${profileId}/health/documents`, bodyFormData, {
					headers: { "Content-Type": "multipart/form-data" }
				})
				.then((response) => {
					Log.info(response);
					console.log(response)
				})
				.catch((error) => {
					Log.error(error);
				})
		}
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
				{console.log(documents)}
				{documents.length > 0 ? (
					<ul>
						{documents.map((_document, index) => (
							<li key={index}>
								<DocumentListItem userId={profileId} />
							</li>
						))}
					</ul>
				) : (
					<div style={divStyle} >
						{myProfile && (
							<i className="fas fa-file-upload fa-10x" style={labelStyle} />
						)}
					</div>
				)}

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
	"marginTop": "100px",
	height: "100%",
	display: "flex",
	"justifyContent": "center",
	"alignItems": "center"
}

const fileInput = {
	opacity: 0.5,
	"paddingLeft": "50px"
}

const labelStyle = {
	opacity: 0.4
}

export default withLanguage(DocumentProfileInfo);

