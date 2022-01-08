import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Loadable from "react-loadable";
import Log from "./Log";
// import PropTypes from "prop-types";
import * as path from "lodash.get";
import CovidAlertHeader from "./CovidAlertHeader";
import LoadingSpinner from "./LoadingSpinner";
import CovidAlertNavbar from "./CovidAlertNavbar";

const CovidAlertReports = Loadable({
    loader: () => import("./CovidAlertReports"),
    loading: () => <div />,
});

const CovidAlertGreenPass = Loadable({
    loader: () => import("./CovidAlertGreenPass"),
    loading: () => <div />,
});

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

class CovidAlertScreen extends React.Component {

    state = {
        profile: {},
        fetchedProfile: false,
    };

    async componentDidMount() {
        const { match } = this.props;
        const { profileId } = match.params;
        const profile = await getMyProfile(profileId);
        this.setState({
            profile,
            fetchedProfile: true,
        });
    }

    render() {
        const { match } = this.props;
        const { profileId } = match.params;
        const { profile, fetchedProfile } = this.state;
        const currentPath = match.url;
        // const texts = Texts[language].ProfileDocumentHeader;
        return fetchedProfile ? (
            <React.Fragment>
                <CovidAlertHeader
                    name={`${profile.given_name} ${profile.family_name}`}
                    photo={path(profile, ["image", "path"])}
                />
                <React.Fragment>
                    <CovidAlertNavbar>
                        <Route
                            exact
                            path={`${currentPath}/report`}
                            render={(props) => <CovidAlertReports {...props} />}
                        />
                        <Route
                            exact
                            path={`${currentPath}/greenpass`}
                            render={(props) => <CovidAlertGreenPass {...props} />}
                        />
                    </CovidAlertNavbar>
                </React.Fragment>
            </React.Fragment>

        ) : (
            <LoadingSpinner />
        );
    }
}

CovidAlertScreen.propTypes = {
    // TODO
};

export default CovidAlertScreen;
