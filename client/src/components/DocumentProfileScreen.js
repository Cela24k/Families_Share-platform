import React from "react";
import axios from "axios";
import Log from "./Log";
import PropTypes from "prop-types";
import * as path from "lodash.get";
import DocumentProfileHeader from "./DocumentProfileHeader";
import DocumentProfileInfo from "./DocumentProfileInfo";
import LoadingSpinner from "./LoadingSpinner";

/* richiede i documenti al server */
const getMyDocuments = async (userId) => {
  try {
    const response = await axios
      .get(`/api/users/${userId}/health/documents`);
    return response.data;
  } catch (error) {
    Log.error(error);
    return [];
  }
};

/* richiede le informazioni al server del profilo dello user attualmente connesso */
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

const getMyChildrenInfo = (userId, userChildren) => {
  const childrenInfo = [];
  userChildren.forEach(async child => {
    await axios
      .get(`/api/users/${userId}/children/${child.child_id}`)
      .then(response => {
        childrenInfo.push(response.data)
      })
      .catch(error => {
        Log.error(error)
        childrenInfo.push({
          image: { path: "" },
          birthdate: new Date(),
          gender: "unspecified",
          given_name: "",
          family_name: "",
          child_id: "",
        })
      })
  })
  return childrenInfo;
}

class DocumentProfileScreen extends React.Component {

  state = {
    profile: {},
    documents: [],
    childrenInfo: [],
    fetchedProfile: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { profileId } = match.params;
    const userDocuments = await getMyDocuments(profileId);
    const userChildren = await getMyChildren(profileId);
    const childrenInfo = getMyChildrenInfo(profileId, userChildren);
    const profile = await getMyProfile(profileId);
    // const children = await getMyChildren(profileId);
    console.log("childrenInfo: ", childrenInfo);
    this.setState({
      profile,
      documents: userDocuments,
      childrenInfo,
      fetchedProfile: true,
    });
  }

  render() {
    const { match } = this.props;
    const { profileId } = match.params;
    const { profile, documents, fetchedProfile, childrenInfo } = this.state;
    // const texts = Texts[language].ProfileDocumentHeader;
    return fetchedProfile ? (
      <React.Fragment>
        <DocumentProfileHeader
          name={`${profile.given_name} ${profile.family_name}`}
          photo={path(profile, ["image", "path"])}
        />
        <DocumentProfileInfo
          profile={profile}
          profileId={profileId}
          userDocuments={documents}
          userChildren={childrenInfo}
        />
      </React.Fragment>
    ) : (
      <LoadingSpinner />
    );
  }
}

DocumentProfileScreen.propTypes = {
  documents: PropTypes.array
};

export default DocumentProfileScreen;
