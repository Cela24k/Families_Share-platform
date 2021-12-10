import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import * as path from "lodash.get";
import ChildProfileHeader from "./ChildProfileHeader";
import ChildProfileInfo from "./ChildProfileInfo";
import LoadingSpinner from "./LoadingSpinner";
import Log from "./Log";

class MyComp extends React.Component {
  render() {
    return (
      <div>
        <h1>Caricata correttamente</h1>
      </div>
    )
  }
}

MyComp.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};

export default MyComp;
