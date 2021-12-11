import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Skeleton } from "antd";
import moment from "moment";
import { withRouter } from "react-router-dom";
import * as path from "lodash.get";
import Texts from "../Constants/Texts";
import withLanguage from "./LanguageContext";
import Avatar from "./Avatar";
import Log from "./Log";

class DocumentListItem extends React.Component {

    state = {
        fetchedDocument: false,
        _document: {}
    }

    componentDidMount() {
        const { userId } = this.props;
        axios
            .get(`/api/users/${userId}/health/documents`)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    fetchedDocument: true,
                    _document: response.data
                });
            })
            .catch((error) => {
                Log.error(error);
            })
    }

    render() {
        const { fetchedDocument, _document } = this.state;
        const { userId, keyId } = this.props; //aggiunto keyId al prop per sapere cosa usare come indice per stampare
        // const texts = Texts[language].documentListItem;
        return (
            <div
                id="childContainer"
                className="row no-gutters"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.1" }}
            >
                {fetchedDocument ? (
                    <React.Fragment>
                        <div className="col-3-10">

                        </div>
                        <div className="col-7-10">
                            <div
                                role="button"
                                tabIndex={-42}
                                id="childInfoContainer"
                                className="verticalCenter"
                            >
                                {/*TODO OnClick */
                                console.log(keyId)}
                                <h1>{`${_document[keyId].file_name}`}</h1>
                                <h2>Documento</h2>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    <Skeleton avatar active paragraph={{ rows: 1 }} />
                )}
            </div>
        );
    }


}


export default withRouter(withLanguage(DocumentListItem));
