import React from "react";
// import PropTypes from "prop-types";
import axios from "axios";
import { Fab, Action } from 'react-tiny-fab';
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChild, faSpinner } from '@fortawesome/free-solid-svg-icons'
// import Texts from "../Constants/Texts";
import withLanguage from "./LanguageContext";
import Log from "./Log";

class DocumentFabItem extends React.Component {

    state = {
        fetchedChild: false,
        childInfo: {}
    };

    componentDidMount() {
        const { userId, childId } = this.props;
        axios
            .get(`/api/users/${userId}/children/${childId}`)
            .then(response => {
                this.setState({
                    fetchedChild: true,
                    childInfo: response.data
                });
            })
            .catch(error => {
                Log.error(error);
                alert(error);
            })
    }

    render() {
        const { fetchedChild, childInfo } = this.state;
        return (
            <div>
                {fetchedChild ? (
                    <Action
                        id={childInfo.child_id}
                        style={style}
                        text={childInfo.given_name}
                        children={<FontAwesomeIcon icon={faChild} />}
                        onClick={() => document.getElementById('input').click()}
                    />
                ) : (
                    <Action
                        id="Loading"
                        text="Loading..."
                        children={<FontAwesomeIcon icon={faSpinner} />}
                    />
                )}
            </div>
        )
    }
}

const style = {
    backgroundColor: "#ff6f00",
};

export default withRouter(withLanguage(DocumentFabItem));