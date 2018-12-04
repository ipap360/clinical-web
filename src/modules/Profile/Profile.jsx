import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { consume } from "../../context";
import Main from "../Main";
import ProfileForm from "./ProfileForm";
import ProfileSidebar from "./ProfileSidebar";
import { layoutStyles as styles } from "../../components";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pwdModal: false
        };
    }

    componentDidMount() {}

    componentWillUnmount() {}

    onClose = () => {
        this.setState({
            pwdModal: false
        });
    };

    render() {
        const { t, classes } = this.props;
        return (
            <React.Fragment>
                <ProfileSidebar />
                <Main title={t("Profile")} sidebar={true}>
                    <Paper square className={classes.mainPaper}>
                        <ProfileForm className={classes.form} />
                    </Paper>
                </Main>
            </React.Fragment>
        );
    }
}

export default consume({ styles })(Profile);
