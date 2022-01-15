import React from "react";
import axios from "axios";
import Log from "./Log";
import PropTypes from "prop-types";
import * as path from "lodash.get";
import DocumentProfileHeader from "./DocumentProfileHeader";
import DocumentProfileInfo from "./DocumentProfileInfo";
import LoadingSpinner from "./LoadingSpinner";

class DocumentProfileScreen extends React.Component {

  state = {
    profile: {},
    myDocuments: [],
    myChildDocuments: [],
    children: [],
    fetchedProfile: false,
    fetchedChildren: false,
    fetchedMyDocuments: false,
    fetchedChildDocuments: false
  };

  getMyChildren = async (userId) => {
    try {
      const response = await axios
        .get(`/api/users/${userId}/children`);
      return response.data;
    } catch (error) {
      Log.error(error);
      return [];
    }
  };

  getMyDocuments = async (userId) => {
    try {
      const response = await axios
        .get(`/api/users/${userId}/health/documents`);
      this.setState({ myDocuments: response.data, fetchedMyDocuments: true });
      return response.data;
    } catch (error) {
      Log.error(error);
      this.setState({ myDocuments: [], fetchedMyDocuments: true });;
    }
  };

  getMyChildDocuments = async (userId, userChildren) => {
    const childrenDocuments = [];
    userChildren.forEach(async child => {
      await axios
        .get(`/api/users/${userId}/health/documents/${child.child_id}`)
        .then(response => {
          childrenDocuments.push(response.data)
        })
        .catch(error => {
          Log.error(error)
        })
    })
    this.setState({ myChildDocuments: childrenDocuments, fetchedChildDocuments: true })
  }

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
    const children = await this.getMyChildren(profileId);
    await this.getMyDocuments(profileId);
    await this.getMyChildDocuments(profileId, children);
    await this.getMyChildrenInfo(profileId, children);
    await this.getMyProfile(profileId);
  }

  render() {
    const { match } = this.props;
    const { profileId } = match.params;
    const {
      profile,
      myDocuments,
      myChildDocuments,
      children,
      fetchedProfile,
      fetchedChildren,
      fetchedMyDocuments,
      fetchedChildDocuments
    } = this.state;
    // const texts = Texts[language].ProfileDocumentHeader;
    return fetchedProfile && fetchedChildren && fetchedChildDocuments && fetchedMyDocuments ? (
      <React.Fragment>
        <DocumentProfileHeader
          name={`${profile.given_name} ${profile.family_name}`}
          photo={path(profile, ["image", "path"])}
        />
        <DocumentProfileInfo
          profile={profile}
          profileId={profileId}
          userDocuments={myDocuments}
          childrenDocuments={myChildDocuments}
          userChildren={children}
        />
      </React.Fragment>
    ) : (
      <LoadingSpinner />
    );
  }
}

DocumentProfileScreen.propTypes = {
  myDocuments: PropTypes.array,
  children: PropTypes.array
};

export default DocumentProfileScreen;
