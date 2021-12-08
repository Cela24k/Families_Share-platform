import React from "react";
import axios from "axios";
import Log from "./Log";
import * as path from "lodash.get";
import DocumentProfileHeader from "./DocumentProfileHeader";
import DocumentProfileInfo from "./DocumentProfileInfo";
import LoadingSpinner from "./LoadingSpinner";

/* richiede i documenti al server */
const getMyDocuments = (userId) => {
    return axios
        .get(`/api/users/${userId}/health/documents`)
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

class DocumentProfileScreen extends React.Component {
    state = {
        profile: {},
        documents: [],
        fetchedProfile: false,
    };

    async componentDidMount() {
        const { match } = this.props;
        const { profileId } = match.params;
        const userDocuments = await getMyDocuments(profileId);
        const profile = await getMyProfile(profileId);
        this.setState({
            profile,
            userDocuments,
            fetchedProfile: true,
        });
    }

    render() {
        const { match } = this.props;
        const { profileId } = match.params;
        const { profile, documents, fetchedProfile } = this.state;
        // const texts = Texts[language].ProfileDocumentHeader;
        return fetchedProfile ? (
            <React.Fragment>
                <DocumentProfileHeader
                    name={`${profile.given_name} ${profile.family_name}`}
                    photo={path(profile, ["image", "path"])}
                />
                <DocumentProfileInfo profileId={profileId} userDocuments={documents} />
            </React.Fragment>
        ) : (
            <LoadingSpinner />
        );
    }
}

export default DocumentProfileScreen;
