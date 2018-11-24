import React, { Component } from "react";
import {} from "../../components";
import { consume } from "../../context";
import TopBar from "../TopBar";
import Main from "../Main";

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        const { t } = this.props;

        return (
            <React.Fragment>
                <TopBar title="Profile" />
                <Main>
                    {/* <SimpleTable data={data} headerContainer={container} /> */}
                </Main>
            </React.Fragment>
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
export default consume({ store })(Profile);
