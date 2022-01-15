import React from "react";
import axios from "axios";
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
    const { profileId, userDocuments, childDocuments } = this.props;
    const myProfile = userId === profileId;
    this.readFile = this.readFile.bind(this);
    this.state = {
      myProfile,
      profileId,
      is_child: false
    };
  }

  readFile(user_id) {
    const { profileId, is_child } = this.state;
    const file = document.getElementById(user_id).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      axios
        .post(`/api/users/${profileId}/health/documents`, {
          "user_id": user_id,
          "is_child": is_child,
          "filename": file.name,
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
    const { myProfile, profileId } = this.state;
    const { profile, userChildren, userDocuments, childrenDocuments } = this.props;
    return (
      <React.Fragment>
        {myProfile && userDocuments.length > 0 ? (
          <ul>
            {userDocuments.map((_document, index) => (
              <li key={index}>
                <DocumentListItem
                  is_child={false}
                  profileId={profileId}
                  documentId={_document.user_id}
                  keyId={index}
                />
              </li>
            ))}
            {childrenDocuments.map((_document, index) => (
              <li key={index}>
                <DocumentListItem
                  is_child={true}
                  profileId={profileId}
                  documentId={_document.user_id}
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
        {/** qui sotto c'è tutto ciò che serve per il fab */}
        <div id="fab-container">
          <input
            id={profileId}
            style={fileInput}
            type="file"
            onChange={() => this.readFile(profileId)}
          />
          {userChildren.map(child => (
            <input
              id={child.child_id}
              style={fileInput}
              type="file"
              onChange={() => this.readFile(child.child_id)}
            />
          ))}
          {myProfile && (
            <Fab
              mainButtonStyles={mainButtonStyles}
              alwaysShowTitle={true}
              icon={<FontAwesomeIcon icon={faPlus} />}
            >
              <Action
                style={actionStyles}
                text={profile.given_name}
                onClick={() => {
                  this.setState({ is_child: false });
                  document.getElementById(profileId).click();
                }}
              >
                <FontAwesomeIcon icon={faUser} />
              </Action>
              {userChildren.map(child => (
                <Action
                  style={actionStyles}
                  text={child.given_name}
                  onClick={() => { 
                    this.setState({ is_child: true }); 
                    document.getElementById(child.child_id).click();
                  }}
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

