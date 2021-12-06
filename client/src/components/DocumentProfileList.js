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
    const { classes, language } = this.props;
    const { profileId, myProfile } = this.state;
    // const { documents, profileId, myProfile } = this.state;
    // const texts = Texts[language].profileDocuments;
    return (
      <React.Fragment>
        <div className="addChildPrompt">Non sono stati aggiunti documenti!</div>

        <div style={imageStyle} >
          {myProfile && (
            <i class="fas fa-file-upload fa-10x"
              style={divStyle}>
            </i>
          )}
        </div>

        <div style={label}>
          <i className="addChildPrompt">Nessun file selezionato</i>
        </div>
        
        <div style={imageStyle}>
          <input style={label}
            id="files"
            className="hidden"
            id="get-document"
            type="file"
            onChange={this.readFile}
          />
        </div>
          
      </React.Fragment>
    );
  }
}

const imageStyle = {
  height: "100%",
  display: "flex",
  "justify-content": "center",
  "align-items": "center"
}

const label = {
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  opacity: 0.5
}
const divStyle = {
  opacity: 0.4
}
export default withStyles(styles)(withLanguage(DocumentProfileList));
