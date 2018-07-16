import React from 'react';
import Main from '../Main';
import { withStyles } from '@material-ui/core';
import { Typography, Toolbar, Paper, Icon, Button, HorizontalLinearSteps } from '../../../components';
import PersonForm from '../PersonForm';

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
    // closeBtn: {
    //     position: 'absolute',
    //     bottom: theme.spacing.unit * 8.5,
    //     right: theme.spacing.unit * 4.5,
    // }
})

class NewCalendarEvent extends React.Component {

    getStepContent(activeStep) {
        switch (activeStep) {
            case 0:
                return (<PersonForm />);
            case 1:
                return null;
            case 2:
                return null;
            default:
                return null;
        }
    }

    render() {

        const { classes, t, activeStep, steps } = this.props;

        const title = "" || t("New Calendar Event");

        const header = (
            <Toolbar className={classes.header} disableGutters>
                <Typography variant='headline'>{{ title }}</Typography>
            </Toolbar>
        );

        const allowNext = false;
        const allowPrevious = activeStep > 0;
        const insertEvent = () => { };
        const cancelInsert = () => { };

        return (
            <Main header={header}>
                <Paper square className={classes.paper}>
                    <HorizontalLinearSteps activeStep={activeStep} steps={steps} />
                    <div className={classes.stepContent}>
                        {this.getStepContent(activeStep)}
                    </div>
                    <div className={classes.stepBtnContainer}>
                        <Button className={classes.closeBtn} onClick={cancelInsert} size="small" disabled={!allowPrevious}>
                            {t("Back")}
                        </Button>
                        <Button variant="contained" className={classes.nextBtn} color="primary" size="large" disabled={!allowNext} onClick={insertEvent}>
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