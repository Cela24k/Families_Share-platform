import React from "react";
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
