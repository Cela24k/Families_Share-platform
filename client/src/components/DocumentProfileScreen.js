import React from "react";
import axios from "axios";
import Log from "./Log";
import DocumentProfileHeader from "./DocumentProfileHeader";
import DocumentProfileInfo from "./DocumentProfileInfo";
import LoadingSpinner from "./LoadingSpinner";

/* richiede i documenti al server */
const getMyDocuments = () => {
    return axios
        .get(`/api/health/documents`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            Log.error(error);
            return [];
        })
};

class DocumentProfileScreen extends React.Component {

    state = {
        fetchedProfile: false,
        documents: []
    };

    async componentDidMount() {
        const { match } = this.props;
        const { profileId } = match.params;
        const userDocuments = await getMyDocuments();
        this.setState({
            fetchedProfile: true,
            documents: userDocuments
        });
    }

    render() {
        const { match } = this.props;
        const { profileId } = match.params;
        const { fetchedProfile, documents } = this.state;
        // const texts = Texts[language].ProfileDocumentHeader;
        return fetchedProfile ? (
            <React.Fragment>
                <DocumentProfileHeader />
                <DocumentProfileInfo
                    profileId={profileId}
                    userDocuments={documents}
                />
            </React.Fragment>
        ) : (
            <LoadingSpinner />
        );
    }
}

export default DocumentProfileScreen;
