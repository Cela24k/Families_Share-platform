import React from "react";
import axios from "axios";
// import Texts from "../Constants/Texts";
// import Fab from "@material-ui/core/Fab";
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChild, faUser } from '@fortawesome/free-solid-svg-icons'
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
      axios
        .post(`/api/users/${profileId}/health/documents`, {
          "filename": file.name,
          "filedata": reader.result
        })
        .then((response) => {
          /*trovare un metodo più elegante, spoiler: esiste ed è quello di aggiornare lo state della component genitore \
          in questo caso suppongo bisogni aggiornare lo state sia della singola componente DocumentList, sia lo stato di \
          DocumentProfileInfo */
          //aggiunto il metodo per reloadare la pagina quando viene caricato un documento accettato
          window.location.reload(false);
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
    const { profile, userChildren } = this.props;
    // const texts = Texts[language].profileDocuments;
    return (
      <React.Fragment>
        {myProfile && documents.length > 0 ? (
          <ul>
            {documents.map((_document, index) => (
              <li key={index}>
                <DocumentListItem
                  userId={profileId}
                  keyId={index}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div style={divStyle} >
            <i className="fas fa-file-upload fa-10x" style={labelStyle} />
          </div>
        )}
        <div>
          <input
            style={fileInput}
            id="input"
            type="file"
            onChange={this.readFile}
          />
          {myProfile && (
            <Fab
              mainButtonStyles={mainButtonStyles}
              alwaysShowTitle={true}
              icon={<FontAwesomeIcon icon={faPlus} />}
            >
              <Action
                id={profileId}
                style={actionStyles}
                text={profile.given_name}
                onClick={() => document.getElementById('input').click()}
              >
                <FontAwesomeIcon icon={faUser} />
              </Action>
              {userChildren.map(child => (
                <Action
                  id={child.child_id}
                  style={actionStyles}
                  text={child.given_name}
                  onClick={() => document.getElementById('input').click()}
                >
                  <FontAwesomeIcon icon={faChild} />
                </Action>
              ))}
            </Fab>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mainButtonStyles = {
  backgroundColor: "#ff6f00",
}

const actionStyles = {
  backgroundColor: "#ff8c00",
};

const divStyle = {
  "marginTop": "100px",
  height: "100%",
  display: "flex",
  "justifyContent": "center",
  "alignItems": "center"
}

const fileInput = {
  display: "none"
}

const labelStyle = {
  opacity: 0.4
}

export default withLanguage(DocumentProfileInfo);

