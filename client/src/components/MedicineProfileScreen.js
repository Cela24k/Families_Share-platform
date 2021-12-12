import React from "react";
import axios from "axios";
import Log from "./Log";
import PropTypes from "prop-types";
import * as path from "lodash.get";
/*
    manca medicinesProfileInfo, MedicineListItem, MedicineProfileHeader
*/
import LoadingSpinner from "./LoadingSpinner";


/* richiede i medicinali al server */
const getMyMedicines = (userId) => {
    return axios
        .get(`/api/users/${userId}/health/medicines/edit`)
        .then((response) => {
            console.log(response.data)
            return response.data;
        })
        .catch((error) => {
            Log.error(error);
            return [];
        });
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

class MedicineProfileScreen extends React.Component {

    state = {
        profile: {},
        medicines: [],
        fetchedProfile: false,
    };

    async componentDidMount() {
        const { match } = this.props;
        const { profileId } = match.params;
        const userMedicines = await getMyMedicines(profileId);
        const profile = await getMyProfile(profileId);
        this.setState({
            profile,
            medicines: userMedicines,
            fetchedProfile: true,
        });
    }

    render() {
        const { match } = this.props;
        const { profileId } = match.params;
        const { profile, medicines, fetchedProfile } = this.state;
        return fetchedProfile ? (
            <React.Fragment>
                <MedicineProfileHeader
                    name={`${profile.given_name} ${profile.family_name}`}
                    photo={path(profile, ["image", "path"])}
                />
                <MedicineProfileInfo profileId={profileId} userMedicines={medicines} />
            </React.Fragment>
        ) : (
            <LoadingSpinner />
        );
    }
}

MedicineProfileScreen.propTypes = {
    medicines: PropTypes.array
};

export default MedicineProfileScreen;
