import React from "react";
import axios from "axios";
import Log from "./Log";
import PropTypes from "prop-types";
import * as path from "lodash.get";
import DocumentProfileHeader from "./DocumentProfileHeader";
import DocumentProfileInfo from "./DocumentProfileInfo";
import LoadingSpinner from "./LoadingSpinner";



const getMyChildren = async (userId) => {
  try {
    const response = await axios
      .get(`/api/users/${userId}/children`);
    return response.data;
  } catch (error) {
    Log.error(error);
    return [];
  }
};

class DocumentProfileScreen extends React.Component {

  state = {
    profile: {},
    documents: [],
    children: [],
    fetchedProfile: false,
    fetchedChildren: false
  };

  /* richiede le informazioni al server del profilo dello user attualmente connesso */
  getMyProfile = async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}/profile`);
      this.setState({ profile: response.data, fetchedProfile: true })
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

  /* richiede i documenti al server */
  getMyDocuments = async (userId) => {
    try {
      const response = await axios
        .get(`/api/users/${userId}/health/documents`);
      this.setState({ documents: response.data });
      return response.data;
    } catch (error) {
      Log.error(error);
      return [];
    }
  };

  getMyChildrenInfo = async (userId, userChildren) => {
    const childrenInfo = [];
    userChildren.forEach(async child => {
      await axios
        .get(`/api/users/${userId}/children/${child.child_id}`)
        .then(response => {
          childrenInfo.push(response.data)
        })
        .catch(error => {
          Log.error(error)
        })
    })
    this.setState({ children: childrenInfo, fetchedChildren: true })
  }

  async componentDidMount() {
    const { match } = this.props;
    const { profileId } = match.params;
    await this.getMyDocuments(profileId);
    const children = await getMyChildren(profileId);
    await this.getMyChildrenInfo(profileId, children);
    await this.getMyProfile(profileId);
  }

  render() {
    const { match } = this.props;
    const { profileId } = match.params;
    const { profile, documents, fetchedProfile, fetchedChildren, children } = this.state;
    // const texts = Texts[language].ProfileDocumentHeader;
    return fetchedProfile && fetchedChildren ? (
      <React.Fragment>
        <DocumentProfileHeader
          name={`${profile.given_name} ${profile.family_name}`}
          photo={path(profile, ["image", "path"])}
        />
        <DocumentProfileInfo
          profile={profile}
          profileId={profileId}
          userDocuments={documents}
          userChildren={children}
        />
      </React.Fragment>
    ) : (
      <LoadingSpinner />
    );
  }
}

DocumentProfileScreen.propTypes = {
  documents: PropTypes.array,
  children: PropTypes.array
};

export default DocumentProfileScreen;
