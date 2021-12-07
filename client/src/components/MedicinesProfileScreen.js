import React from "react";
import MedicinesHeader from "./MedicinesHeader";
import MedicinesInfo from "./MedicinesInfo"
import * as path from "lodash.get";
import LoadingSpinner from "./LoadingSpinner";
import Log from "./Log";
import axios from "axios";
import { Calendar } from "antd";

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

class MedicinesProfileScreen extends React.Component {

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
        const { profile, documents, fetchedProfile } = this.state;
        return fetchedProfile ? (
            <React.Fragment>
                <MedicinesHeader
                    photo={path(profile, ["image", "path"])}
                /> 
                <MedicinesInfo
                    profileId={profileId}
                />
                <div >
                    {/*<Calendar fullscreen={true}
                    />*/}
                </div>
            </React.Fragment>
        ) : (
            <LoadingSpinner />
        );
    }
}

export default MedicinesProfileScreen;
