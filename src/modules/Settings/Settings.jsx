import React, { Component } from "react";

import Main from "../Main";
import { RoomsList } from "../Rooms";
import { Thresholds } from "../Thresholds";

class Settings extends Component {
    render() {
        return (
            <Main title="Settings">
                <RoomsList />
                <Thresholds />
            </Main>
        );
    }
}

export default Settings;
