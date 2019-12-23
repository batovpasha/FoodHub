import React from 'react'

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

export const OrderStepper = ({ activeStep }) => {
    const steps = ['Выберите ресторан', 'Выберите понравившиеся блюда', 'Оформите заказ'];
    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
}
