import React, { Component } from "react";
import { consume } from "../../context";
import { fetchPatients } from "./store";

class PatientsList extends Component {
    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return <div />;
    }
}

const d2p = {
    fetchPatients
};

const store = { d2p };
export default consume({ store })(PatientsList);
