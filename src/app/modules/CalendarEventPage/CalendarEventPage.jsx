import React from "react";
import Main from "../Main";
import { withStyles, AppBar } from "@material-ui/core";
import { Typography, Toolbar, Paper, Modal, Button } from "../../../components";
import CalendarEventForm from "../CalendarEventForm";
import PersonForm from "../PatientForm";
import { ROOT } from "../paths";
import CopyEventForm from "../CopyEventForm";
import classNames from "classnames";
import PostponeEventForm from "../PostponeEventForm";

const style = theme => ({
    root: {},
    paper: {
        flex: "1 auto",
        width: "100%",
        padding: theme.spacing.unit * 2
    },
    header: {
        flex: "1 auto",
        position: "relative",
        backgroundColor: "#e4eb30",
        // color: theme.palette.getContrastText('#e4eb30'),
        padding: theme.spacing.unit * 2,
        width: "100%"
    },
    title: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    modal: {
        height: 500,
        width: 600,
        overflowY: "auto",
        marginTop: -250,
        top: "50%",
        position: "absolute",
        left: "50%",
        marginLeft: -300,
        "&.short": {
            height: 300
        }
    },
    form: {
        width: 600
    },
    modalform: {},
    sidebar: {
        display: "flex",
        "flex-direction": "column",
        "justify-content": "flex-start",
        "align-items": "stretch",
        height: "100%",
        "margin-top": "32px",
        "margin-left": theme.spacing.unit,
        "& > div": {
            marginBottom: theme.spacing.unit * 3
        }
    }
});

class CalendarEventPage extends React.Component {
    componentWillMount() {}

    render() {
        const {
            classes,
            t,
            history,
            location,
            match,
            title,
            newPatientModal,
            postponeEventModal,
            copyEventModal,
            newPersonModal,
            postponeModal,
            copyModal,
            closeModals
        } = this.props;

        // console.log(this.props);

        const {
            params: { id }
        } = match;

        // eslint-disable-next-line
        const isNew = id === "new" || id == "0";
        const date = location.state && location.state.date;

        const header = (
            <Toolbar className={classes.header} disableGutters>
                <Typography variant="headline" className={classes.title}>
                    {title(isNew)}
                </Typography>
            </Toolbar>
        );

        const sidebar = isNew ? (
            <div className={classes.sidebar}>
                <div>
                    <Button
                        onClick={newPersonModal}
                        variant="contained"
                        fullWidth
                    >
                        {t("Add new patient")}
                    </Button>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={newPatientModal}
                        onClose={closeModals}
                    >
                        <Paper square className={classes.modal}>
                            <div>
                                <AppBar position="static">
                                    <Toolbar>
                                        <Typography
                                            variant="title"
                                            color="inherit"
                                        >
                                            Add new patient
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <Toolbar>
                                    <PersonForm
                                        // form={NEW_EVENT_PERSON_FORM}
                                        modal={true}
                                        className={classes.modalform}
                                        onSubmitSuccess={(
                                            result,
                                            dispatch,
                                            props
                                        ) => {
                                            console.log(
                                                result,
                                                dispatch,
                                                props
                                            );
                                            // closeModals();
                                        }}
                                    />
                                </Toolbar>
                            </div>
                        </Paper>
                    </Modal>
                </div>
                <div>
                    <Button fullWidth onClick={() => history.go(-1)}>
                        {/* <Icon style={{marginRight: 8}}>arrow_back_ios</Icon> */}
                        {t("Back")}
                    </Button>
                </div>
            </div>
        ) : (
            <div className={classes.sidebar}>
                <div>
                    <Button
                        onClick={postponeModal}
                        variant="contained"
                        fullWidth
                    >
                        {t("Postpone")}
                        {/* <i className="fas fa-forward"></i> */}
                    </Button>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={postponeEventModal}
                        onClose={closeModals}
                    >
                        <Paper
                            square
                            className={classNames(classes.modal, "short")}
                        >
                            <div>
                                <AppBar position="static">
                                    <Toolbar>
                                        <Typography
                                            variant="title"
                                            color="inherit"
                                        >
                                            Postpone
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <Toolbar>
                                    <PostponeEventForm
                                        modal={true}
                                        className={classes.modalform}
                                        description="Test"
                                        person="Hi"
                                        initialValues={{ id }}
                                        onSubmitSuccess={(
                                            result,
                                            dispatch,
                                            props
                                        ) => {
                                            console.log(
                                                result,
                                                dispatch,
                                                props
                                            );
                                            closeModals();
                                        }}
                                    />
                                </Toolbar>
                            </div>
                        </Paper>
                    </Modal>
                </div>
                <div>
                    <Button onClick={copyModal} variant="contained" fullWidth>
                        {t("Next appointment")}
                    </Button>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={copyEventModal}
                        onClose={closeModals}
                    >
                        <Paper
                            square
                            className={classNames(classes.modal, "short")}
                        >
                            <div>
                                <AppBar position="static">
                                    <Toolbar>
                                        <Typography
                                            variant="title"
                                            color="inherit"
                                        >
                                            Schedule next appointment
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <Toolbar>
                                    <CopyEventForm
                                        modal={true}
                                        className={classes.modalform}
                                        description="Test"
                                        person="Hi"
                                        initialValues={{ id }}
                                        onSubmitSuccess={(
                                            result,
                                            dispatch,
                                            props
                                        ) => {
                                            console.log(
                                                result,
                                                dispatch,
                                                props
                                            );
                                            closeModals();
                                        }}                                        
                                    />
                                </Toolbar>
                            </div>
                        </Paper>
                    </Modal>
                </div>
                {/* <br/> */}
                {/* <br/> */}
                {/* <br/> */}
                {/* <br/> */}
                <div>
                    <Button fullWidth onClick={() => history.go(-1)}>
                        {/* <Icon style={{marginRight: 8}}>arrow_back_ios</Icon> */}
                        {t("Back")}
                    </Button>
                </div>
            </div>
        );

        return (
            <Main header={header} sidebar={sidebar}>
                <Paper square className={classes.paper}>
                    <CalendarEventForm
                        className={classes.form}
                        onSubmitSuccess={(result, dispatch, props) => {
                            console.log(result, dispatch, props);
                            history.push(ROOT);
                        }}
                        id={isNew ? 0 : id}
                        initialValues={date ? { date } : null}
                    />
                </Paper>
            </Main>
        );
    }
}

export default withStyles(style)(CalendarEventPage);
