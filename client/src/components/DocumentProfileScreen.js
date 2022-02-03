import React from "react";
import axios from "axios";
import Log from "./Log";
import * as path from "lodash.get";
import DocumentProfileHeader from "./DocumentProfileHeader";
import DocumentProfileInfo from "./DocumentProfileInfo";
import LoadingSpinner from "./LoadingSpinner";

class DocumentProfileScreen extends React.Component {

    state = {
        profile: {},
        userDocuments: [],
        childrenProfiles: [],
        childrenDocuments: [],
        fetchedAll: false
    };

    getUserProfile = async (profileId) => {
        try {
            const response = await axios.get(`/api/users/${profileId}/profile`);
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
    }

    getUserChildren = async (profileId) => {
        return axios
            .get(`/api/users/${profileId}/children`)
            .then(response => {
                return response.data.map(child => child.child_id);
            })
            .catch(error => {
                Log.error(error);
                return [];
            });
    };

    /** funzione NON async in modo che axios.all possa richiedere i profili dei bambini in parallelo */
    getChildProfile = (profileId, childId) => {
        return axios
            .get(`/api/users/${profileId}/children/${childId}`)
            .then(response => { return response.data })
            .catch(error => {
                Log.error(error);
                return {
                    child_id: childId,
                    image: { path: "" },
                    background: "",
                    given_name: "",
                    family_name: "",
                    birthdate: new Date(),
                    gender: "unspecified",
                    allergies: "",
                    other_info: "",
                    special_needs: ""
                };
            });
    }

    getUserDocuments = async (profileId) => {
        try {
            const response = await axios
                .get(`/api/users/${profileId}/health/documents`);
            return response.data;
        } catch (error) {
            Log.error(error);
            return [];
        }
    }

    /** funzione NON async in modo che axios.all possa richiedere i documenti dei bambini in parallelo */
    getChildDocuments = (profileId, childId) => {
        return axios
            .get(`/api/users/${profileId}/health/documents/${childId}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                Log.error(error);
                return [];
            });
    }

    async componentDidMount() {
        const { match } = this.props;
        const { profileId } = match.params;
        const profile = await this.getUserProfile(profileId);
        const userDocuments = await this.getUserDocuments(profileId);
        const userChildren = await this.getUserChildren(profileId);
        const childrenProfiles = await axios.all(userChildren.map(childId => {
            return this.getChildProfile(profileId, childId);
        }));
        const tmp = await axios.all(userChildren.map(childId => {
            return this.getChildDocuments(profileId, childId);
        }));
        /* soluzione orribile ma per adesso funziona */
        const childrenDocuments = [];
        tmp.forEach(documents => 
            documents.forEach(document => childrenDocuments.push(document)));
        /* triggera il re-rendering */
        this.setState({
            profile,
            userDocuments,
            childrenProfiles,
            childrenDocuments,
            fetchedAll: true
        });
    }

    render() {
        const { profile, userDocuments, childrenProfiles, childrenDocuments, fetchedAll } = this.state;
        return fetchedAll ? (
            <React.Fragment>
                <DocumentProfileHeader
                    name={`${profile.given_name} ${profile.family_name}`}
                    photo={path(profile, ["image", "path"])}
                />
                <DocumentProfileInfo
                    profile={profile}
                    profileId={profile.user_id}
                    userDocuments={userDocuments}
                    childrenDocuments={childrenDocuments}
                    childrenProfiles={childrenProfiles}
                />
            </React.Fragment>
        ) : (
            <LoadingSpinner />
        );
    }
}

export default DocumentProfileScreen;