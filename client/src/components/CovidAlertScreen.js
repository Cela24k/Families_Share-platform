import React from "react";
import axios from "axios";
import Log from "./Log";
// import PropTypes from "prop-types";
import * as path from "lodash.get";
import CovidAlertHeader from "./CovidAlertHeader";
import CovidAlertInfo from "./CovidAlertInfo";
import LoadingSpinner from "./LoadingSpinner";

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
        // const texts = Texts[language].ProfileDocumentHeader;
        return fetchedProfile ? (
            <React.Fragment>
                <CovidAlertHeader
                    name={`${profile.given_name} ${profile.family_name}`}
                    photo={path(profile, ["image", "path"])}
                />
                <CovidAlertInfo profileId={profileId} />
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
