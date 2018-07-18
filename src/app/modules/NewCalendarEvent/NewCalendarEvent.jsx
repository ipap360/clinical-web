import React from 'react';
import Main from '../Main';
import { withStyles, Divider } from '@material-ui/core';
import { Typography, Toolbar, Paper, Icon, Button, HorizontalLinearSteps } from '../../../components';
import PersonForm from '../PersonForm';
import { Select3, DatePicker, TextField } from '../../../components';
import Spacer from '../../../components/atoms/Spacer';

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
    stepContent: {
        padding: theme.spacing.unit * 3
    },
    stepBtnContainer: {
        padding: theme.spacing.unit * 3
    },
    nextBtn: {
        // position: 'absolute',
        marginLeft: theme.spacing.unit * 2
        // bottom: theme.spacing.unit * 4.5,
        // right: theme.spacing.unit * 4.5,
    },
    stepPart: {
        width: 450,
        marginLeft: theme.spacing.unit + 2,
        padding: theme.spacing.unit * 2,
        borderLeft: `4px solid ${theme.palette.primary.main}`
    }
    // closeBtn: {
    //     position: 'absolute',
    //     bottom: theme.spacing.unit * 8.5,
    //     right: theme.spacing.unit * 4.5,
    // }
})

class NewCalendarEvent extends React.Component {

    getStepContent(activeStep) {

        // console.log(this.props);

        const { t, classes, patient, fetchPersons, setPatient, date, setDate, duration, setDuration, description, setDescription } = this.props;

        switch (activeStep) {
            case 0:
                return (
                    <React.Fragment>
                        <div className={classes.stepPart}>
                            <Select3 value={patient} loadOptions={fetchPersons} label={t("Patient")} onChange={v => setPatient(v)} fullWidth />
                        </div>
                        <Spacer />
                        <PersonForm className={classes.stepPart} />
                    </React.Fragment>
                );
            case 1:
                return (
                    <React.Fragment>
                        <div className={classes.stepPart}>
                            <DatePicker label={t("Date")} value={date} onChange={d => setDate(d)} fullWidth />
                        </div>
                        <Spacer />
                        <div className={classes.stepPart}>
                            <TextField value={duration} onChange={e => setDuration(e.target.value)} fullWidth type='number' />
                        </div>
                    </React.Fragment>
                );
            case 2:
                return (
                    // <React.Fragment>
                    <div className={classes.stepPart}>
                        <TextField multiline value={description || ''} onChange={e => setDescription(e.target.value)} fullWidth />
                    </div>
                    // </React.Fragment>
                );
            default:
                return null;
        }
    }

    render() {

        const {
            classes,
            t,
            activeStep,
            steps,
            patient,
            nextStep,
            previousStep,
            allowNext,
            allowPrevious
        } = this.props;

        const title = "" || t("New Calendar Event");

        const header = (
            <Toolbar className={classes.header} disableGutters>
                <Typography variant='headline'>{{ title }}</Typography>
            </Toolbar>
        );

        return (
            <Main header={header}>
                <Paper square className={classes.paper}>
                    <HorizontalLinearSteps activeStep={activeStep} steps={steps} />
                    <div className={classes.stepContent}>
                        {this.getStepContent(activeStep)}
                    </div>
                    <div className={classes.stepBtnContainer}>
                        <Button className={classes.closeBtn} size="small" disabled={!allowPrevious} onClick={() => previousStep()}>
                            {t("Back")}
                        </Button>
                        <Button variant="contained" className={classes.nextBtn} color="primary" size="large" disabled={!allowNext} onClick={() => nextStep()}>
                            {t("Next")}
                        </Button>
                    </div>
                </Paper>
            </Main>
        );
    }

}

export default withStyles(style)(NewCalendarEvent);

// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

// const styles = theme => ({
//   root: {
//     width: '90%',
//   },
//   button: {
//     marginRight: theme.spacing.unit,
//   },
//   instructions: {
//     marginTop: theme.spacing.unit,
//     marginBottom: theme.spacing.unit,
//   },
// });

// function getSteps() {
//   return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
// }

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return 'Select campaign settings...';
//     case 1:
//       return 'What is an ad group anyways?';
//     case 2:
//       return 'This is the bit I really care about!';
//     default:
//       return 'Unknown step';
//   }
// }

// class HorizontalLinearStepper extends React.Component {
//   state = {
//     activeStep: 0,
//     skipped: new Set(),
//   };

//   isStepOptional = step => {
//     return step === 1;
//   };

//   handleNext = () => {
//     const { activeStep } = this.state;
//     let { skipped } = this.state;
//     if (this.isStepSkipped(activeStep)) {
//       skipped = new Set(skipped.values());
//       skipped.delete(activeStep);
//     }
//     this.setState({
//       activeStep: activeStep + 1,
//       skipped,
//     });
//   };

//   handleBack = () => {
//     const { activeStep } = this.state;
//     this.setState({
//       activeStep: activeStep - 1,
//     });
//   };

//   handleSkip = () => {
//     const { activeStep } = this.state;
//     if (!this.isStepOptional(activeStep)) {
//       // You probably want to guard against something like this,
//       // it should never occur unless someone's actively trying to break something.
//       throw new Error("You can't skip a step that isn't optional.");
//     }

//     this.setState(state => {
//       const skipped = new Set(state.skipped.values());
//       skipped.add(activeStep);
//       return {
//         activeStep: state.activeStep + 1,
//         skipped,
//       };
//     });
//   };

//   handleReset = () => {
//     this.setState({
//       activeStep: 0,
//     });
//   };

//   isStepSkipped(step) {
//     return this.state.skipped.has(step);
//   }

//   render() {
//     const { steps,  } = this.props;
//     const steps = getSteps();
//     const { activeStep } = this.state;

//     return (
//       <div>
//         <HorizontalLinearSteps activeStep={activeStep} steps={steps} />
//         <LinearStepsButtonNav activeStep={activeStep} steps={steps} onBack={} onNext={}/>
//         <div>
//           {activeStep === steps.length ? (
//             <div>
//               <Typography className={classes.instructions}>
//                 All steps completed - you&quot;re finished
//               </Typography>
//               <Button onClick={this.handleReset} className={classes.button}>
//                 Reset
//               </Button>
//             </div>
//           ) : (
//             <div>
//               <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
//               <LinearStepsButtonNav></LinearStepsButtonNav>
//               <div>
//                 <Button
//                   disabled={activeStep === 0}
//                   onClick={this.handleBack}
//                   className={classes.button}
//                 >
//                   Back
//                 </Button>
//                 {this.isStepOptional(activeStep) && (
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={this.handleSkip}
//                     className={classes.button}
//                   >
//                     Skip
//                   </Button>
//                 )}
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={this.handleNext}
//                   className={classes.button}
//                 >
//                   {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// HorizontalLinearStepper.propTypes = {
//   classes: PropTypes.object,
// };

// export default withStyles(styles)(HorizontalLinearStepper);