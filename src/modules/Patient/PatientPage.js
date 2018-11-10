import React, { Component } from "react";
import { consume } from "../../context";

class PatientPage extends Component {
    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return <div />;
    }
}

export default consume()(PatientPage);
