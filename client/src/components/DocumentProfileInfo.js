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
        const { profileId } = this.props;
        const myProfile = userId === profileId;
        this.readFile = this.readFile.bind(this);
        this.state = {
            myProfile,
            profileId,
            isChild: false
        };
    }

    readFile(id) {
        const { profileId, isChild } = this.state;
        const file = document.getElementById(id).files[0];
        const reader = new FileReader();
        reader.onload = () => {
            axios
                .post(`/api/users/${profileId}/health/documents`, {
                    "user_id": id,
                    "is_child": isChild,
                    "filename": file.name,
                    "filedata": reader.result,
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

    render() {
        const { myProfile, profileId } = this.state;
        const { profile, userDocuments, childrenDocuments, childrenProfiles } = this.props;
        const documents = userDocuments
            .concat(childrenDocuments)
            .sort((a, b) => new Date(a.file_date) - new Date(b.file_date));
        return (
            <React.Fragment>
                {myProfile && documents.length > 0 ? (
                    <ul>
                        {documents.map((document, index) => (
                            <li key={index}>
                                <DocumentListItem
                                    profileId={profileId}
                                    _document={document}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div style={divStyle} >
                        <i className="fas fa-file-upload fa-10x" style={labelStyle} />
                    </div>
                )}
                {/** FAB implementation */}
                <div id="fab-container">
                    <input
                        id={profileId}
                        style={fileInput}
                        type="file"
                        onChange={() => this.readFile(profileId)}
                    />
                    {childrenProfiles.map(childProfile => (
                        <input
                            id={childProfile.child_id}
                            style={fileInput}
                            type="file"
                            onChange={() => this.readFile(childProfile.child_id)}
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
                                    this.setState({ isChild: false })
                                    document.getElementById(profileId).click()
                                }}
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </Action>
                            {childrenProfiles.map(childProfile => (
                                <Action
                                    style={actionStyles}
                                    text={childProfile.given_name}
                                    onClick={() => {
                                        this.setState({ isChild: true })
                                        document.getElementById(childProfile.child_id).click()
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

