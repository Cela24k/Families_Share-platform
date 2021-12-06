import React from "react";
import { withStyles } from "@material-ui/core/styles";
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
      //documents: userDocuments,
      profileId,
    };
  }

  readFile = () => {
    const file = document.getElementById("get-document").files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      // qui bisognerà salvare il file dentro il db
      console.log(event.target.result);
      const container = document.getElementById("document-data");
      container.innerHTML = event.target.result;
    };
    reader.readAsArrayBuffer(file);
  };

  render() {
    const { classes, language } = this.props;
    const { profileId, myProfile } = this.state;
    // const { documents, profileId, myProfile } = this.state;
    // const texts = Texts[language].profileDocuments;
    return (
      <React.Fragment>
        <div className="addChildPrompt">Non sono stati aggiunti documenti!</div>

        <div className="addChildPrompt">
          {myProfile && (
            <input
              id="get-document"
              className="addChildPrompt"
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

export default withStyles(styles)(withLanguage(DocumentProfileList));