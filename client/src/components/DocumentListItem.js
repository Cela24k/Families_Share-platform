import React from "react";
import ConfirmDialog from "./ConfirmDialog";
// import PropTypes from "prop-types";
import axios from "axios";
import { Skeleton } from "antd";
import { withRouter } from "react-router-dom";
import * as path from "lodash.get";
import Texts from "../Constants/Texts";
import withLanguage from "./LanguageContext";
import Avatar from "./Avatar";
import Log from "./Log";

const getMyProfile = async (userId) => {
  try {
    const response = await axios.get(`/api/users/${userId}/profile`);
    return response.data;
  } catch (error) {
    Log.error(error);
    return {
      given_name: "",
      family_name: "",
      image: { path: "/images/profiles/user_default_photo.png" },
      address: { street: "", number: "" },
      email: "",
      phone: "",
      phone_type: "",
      visible: false,
      user_id: "",
    };
  }
};

const getMyChildProfile = async (profileId, documentId) => {
  try {
    const response = await axios.get(`/api/users/${profileId}/children/${documentId}`);
    return response.data;
  } catch (error) {
    Log.error(error);
    return {
      image: { path: "/images/profiles/user_default_photo.png" },
      birthdate: new Date(),
      gender: "unspecified",
      given_name: "",
      family_name: "",
      child_id: "",
    };
  }
};

class DocumentListItem extends React.Component {

  state = {
    confirmDialogIsOpen: false,
    fetchedDocument: false,
    _document: {},
    profile: {}
  }

  async componentDidMount() {
    const { documentId, is_child, profileId } = this.props;
    var profile = {};
    if (is_child) {
      profile = await getMyChildProfile(profileId, documentId);
    } else {
      profile = await getMyProfile(profileId);
    }
    axios
      .get(`/api/users/${profileId}/health/documents`)
      .then((response) => {
        this.setState({
          fetchedDocument: true,
          _document: response.data,
          profile
        });
      })
      .catch((error) => {
        Log.error(error);
      })
  }

  handleDelete = () => {
    const { _document } = this.state;
    const { keyId, userId } = this.props;
    axios
      .delete(`/api/users/${userId}/health/documents/`, {
        data: {
          _id: _document[keyId]._id
        }
      })
      .then(response => {
        window.location.reload(false);
        Log.info(response);
      })
      .catch(error => {
        Log.error(error);
      });
  }

  handleClick = () => {
    const { _document } = this.state;
    const { keyId } = this.props;
    fetch(_document[keyId].file_data)
      .then(resp => resp.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute("download", _document[keyId].file_name);
        a.click();
      })
      .catch(() => alert('errore nel download'));
  }

  handleConfirmDialogOpen = () => {
    this.setState({ confirmDialogIsOpen: true });
  };

  handleConfirmDialogClose = choice => {
    if (choice === "agree") {
      this.handleDelete();
    }
    this.setState({ confirmDialogIsOpen: false });
  };

  render() {
    const { confirmDialogIsOpen, fetchedDocument, _document, profile } = this.state;
    const { keyId, language } = this.props; //aggiunto keyId al prop per sapere cosa usare come indice per stampare
    const texts = Texts[language].documentListItem;
    return (
      <div
        id="childContainer"
        className="row no-gutters"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.1" }}
      >
        {fetchedDocument ? (
          <React.Fragment>
            <ConfirmDialog
              title={texts.confirmDialog}
              handleClose={this.handleConfirmDialogClose}
              isOpen={confirmDialogIsOpen}
            />
            <div className="col-3-10">
              <Avatar
                thumbnail={path(profile, ["image", "path"])}
                className="center"
              />
            </div>
            <div className="col-5-10">
              <div
                role="button"
                tabIndex={-42}
                id="childInfoContainer"
                className="verticalCenter"
                onClick={this.handleClick}
              >
                <h1>{`${_document[keyId].file_name}`}</h1>
                <h2>{texts.owner}{`${profile.given_name}`}</h2>
              </div>
            </div>
            <div id="div-options" className="col-2-10">
              <button
                type="button"
                className="transparentButton center"
                onClick={this.handleConfirmDialogOpen}
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          </React.Fragment>
        ) : (
          <Skeleton avatar active paragraph={{ rows: 1 }} />
        )}
      </div>
    );
  }


}


export default withRouter(withLanguage(DocumentListItem));
