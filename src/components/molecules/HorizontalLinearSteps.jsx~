import React from 'react';
import { Stepper, Step, StepLabel } from '../atoms';

export default class HorizontalLinearSteps extends React.Component {
    render() {
        const { steps = [], activeStep = 0, ...props } = this.props;
        return (
            <Stepper activeStep={activeStep} {...props}>
                {steps.map((step, index) => {
                    const { label, ...props } = step;
                    return (
                        <Step key={index} {...props}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        );
    }

}