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

	render() {
		const { myProfile, profileId, documents } = this.state;
		// const texts = Texts[language].profileDocuments;
		return (
			<React.Fragment>
				<div className="addChildPrompt">
					{myProfile && (
						<input
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

export default withLanguage(DocumentProfileInfo);
