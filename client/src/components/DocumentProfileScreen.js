import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import * as path from "lodash.get";
import LoadingSpinner from "./LoadingSpinner";
import Log from "./Log";
import DocumentProfileHeader from "./DocumentProfileHeader";
import DocumentProfileList from "./DocumentProfileList";

class DocumentProfileScreen extends React.Component {

    render() {
        return (
            <React.Fragment>
                <DocumentProfileHeader />
                <DocumentProfileList
                    profileId={JSON.parse(localStorage.getItem("user")).id}
                />
            </React.Fragment>
        );
    }
}

export default DocumentProfileScreen;
