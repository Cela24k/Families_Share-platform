import React from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import Loadable from "react-loadable";
import * as path from "lodash.get";
import ProfileHeader from "./ProfileHeader";
import ProfileNavbar from "./ProfileNavbar";
import LoadingSpinner from "./LoadingSpinner";
import Log from "./Log";

const ProfileInfo = Loadable({
  loader: () => import("./ProfileInfo"),
  loading: () => <div />,
});

const ProfileChildren = Loadable({
  loader: () => import("./ProfileChildren"),
  loading: () => <div />,
});

const ProfileHealth = Loadable({
  loader: () => import("./ProfileHealth"),
  loading: () => <div />,
});

const getMyChildren = (userId) => {
  return axios
    .get(`/api/users/${userId}/children`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      Log.error(error);
      return [];
    });
};

const getMyProfile = async (userId) => {
  try {
    const response = await axios
      .get(`/api/users/${userId}/profile`);
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

class ProfileScreen extends React.Component {
  state = {
    profile: {},
    children: [],
    fetchedProfile: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { profileId } = match.params;
    const children = await getMyChildren(profileId);
    const profile = await getMyProfile(profileId);
    this.setState({
      fetchedProfile: true,
      children,
      profile,
    });
  }

  render() {
    const { match } = this.props;
    const { profileId } = match.params;
    const { fetchedProfile, children } = this.state;
    const currentPath = match.url;
    const { profile } = this.state;
    return fetchedProfile ? (
      <React.Fragment>
        <ProfileHeader
          name={`${profile.given_name} ${profile.family_name}`}
          photo={path(profile, ["image", "path"])}
        />
        <React.Fragment>
          <ProfileNavbar />
          <Switch>
            <Route
              exact
              path={`${currentPath}/info`}
              render={(props) => <ProfileInfo {...props} profile={profile} />}
            />
            <Route
              exact
              path={`${currentPath}/children`}
              render={(props) => (
                <ProfileChildren
                  {...props}
                  profileId={profileId}
                  usersChildren={children}
                />
              )}
            />
            <Route
              exact
              path={`${currentPath}/health`}
              render={(props) => (
                <ProfileHealth {...props} profileId={profileId} />
              )}
            />
          </Switch>
        </React.Fragment>
      </React.Fragment>
    ) : (
      <LoadingSpinner />
    );
  }
}

export default ProfileScreen;
