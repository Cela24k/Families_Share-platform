import React from "react";
import MedicinesHeader from "./MedicinesHeader";


class MedicinesProfileScreen extends React.Component {

    render() {
        return (
            <React.Fragment>
                <MedicinesHeader
                /> {/*L'unica cosa da vedere è come mandargli laa foto da props */}
            </React.Fragment>
        );
    }
}

export default MedicinesProfileScreen;
