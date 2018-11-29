import React, { Component } from "react";

import { consume } from "../../context";
import Main from "../Main";
import { RoomsList } from "../Rooms";
import { Thresholds } from "../Thresholds";
import { layoutStyles } from "../../components";

const styles = theme => ({
    ...layoutStyles(theme)
});

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        const { t, classes } = this.props;

        return (
            <Main title="Settings">
                <RoomsList />
                <Thresholds />
            </Main>
        );
    }
}

const s2p = state => ({
    // patients: getPatients(state)
});

const d2p = {
    // fetchPatients
};

const store = { s2p, d2p };
export default consume({ store, styles })(Settings);
