import React from 'react';
import Main from '../Main';
import { withStyles, Divider } from '@material-ui/core';
import { Typography, Toolbar, Paper, Modal, Button, HorizontalLinearSteps } from '../../../components';
import CalendarEventForm from '../CalendarEventForm';
import PersonForm from '../PersonForm';

export const NEW_EVENT_PERSON_FORM = "NEW_EVENT/PERSON_FORM";

const style = theme => ({
    root: {

    },
    paper: {
        flex: '1 auto',
        width: '100%',
        padding: theme.spacing.unit * 2
    },
    header: {
        flex: '1 auto',
        position: 'relative',
        backgroundColor: '#e4eb30',
        // color: theme.palette.getContrastText('#e4eb30'),
        padding: theme.spacing.unit * 2
    },
    modal: {
        height: 400,
        width: 600,
        overflowY: 'auto',
        marginTop: -200,
        top: '50%',
        position: 'absolute',
        left: '50%',
        marginLeft: -300
    },
    form: {
        width: 600
    },
    modalform: {
        
    }
})

class NewCalendarEvent extends React.Component {

    state = {
        newPatientModal: false,
    };

    addNewPatient = () => {
        this.setState({ newPatientModal: true });
    };

    onCloseNewPatientModal = () => {
        this.setState({ newPatientModal: false });
    };

    render() {

        const {
            classes,
            t,
        } = this.props;

        const title = "" || t("New Calendar Event");

        const header = (
            <Toolbar className={classes.header} disableGutters>
                <Typography variant='headline'>{{ title }}</Typography>
            </Toolbar>
        );

        const sidebar = (
            <div>
                <Button onClick={this.addNewPatient}>{t("Add new patient")}</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.newPatientModal}
                    onClose={this.onCloseNewPatientModal}
                >
                    <Paper square className={classes.modal}>
                        <PersonForm form={NEW_EVENT_PERSON_FORM} modal={true} className={classes.modalform} />
                    </Paper>
                </Modal>
            </div>
        );

        return (
            <Main header={header} sidebar={sidebar}>
                <Paper square className={classes.paper}>
                    <CalendarEventForm form="newCalendarEvent" className={classes.form}/>
                </Paper>
            </Main>
        );
    }

}

export default withStyles(style)(NewCalendarEvent);