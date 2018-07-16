import NewCalendarEvent from './NewCalendarEvent';
import { registerReducer, connect2store } from '../../../common';
import { createActionName, createAction } from '../../helpers';

// module name
export const MODULE_NAME = 'newCalendarEvent';

export const NEXT_STEP = createActionName("NEXT_STEP", MODULE_NAME);
export const PREVIOUS_STEP = createActionName("PREVIOUS_STEP", MODULE_NAME);
export const COMPLETE = createActionName("COMPLETE", MODULE_NAME);

export const nextStep = createAction(NEXT_STEP);
export const previousStep = createAction(PREVIOUS_STEP);
export const complete = createAction(COMPLETE);

// initial state
const state0 = {
    activeStep: 0,
    steps: [
        {
            id: 'patient',
            label: "Select a patient or register a new one"
        },
        {
            id: 'dates',
            label: "Pick a date and the duration"
        },
        {
            id: 'details',
            label: "Event details"
        }
    ],
    patient: {
        selected: null,
        options: [],
        loading: false
    },
    scheduling: {
        date: null,
        duration: 0
    },
    description: null
};

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case NEXT_STEP:
            return {
                ...state,
                activeStep: state.activeStep++
            }
        case PREVIOUS_STEP:
            return {
                ...state,
                activeStep: state.activeStep--
            }
        default:
            return state;
    }
}

registerReducer(MODULE_NAME, reducer);

const getState = (state) => state[MODULE_NAME];

export const getActiveStep = (state) => state[MODULE_NAME].activeStep;
export const getSteps = (state) => state[MODULE_NAME].steps;

const s2p = (state) => ({
    activeStep: getActiveStep(state),
    steps: getSteps(state)
});

const m2p = () => ({
    nextStep,
    previousStep,
    complete
});

export default connect2store({ s2p, m2p })(NewCalendarEvent);


// import React from 'react';
// import { connect } from 'react-redux';
// import { Header, Form, Icon, Step } from 'semantic-ui-react';
// import t from 'i18n';
// import { reduxForm } from 'redux-form';
// import { FormButton, FormTextInput, FormTextArea, FormSelect, FormDatePicker } from 'components';
// import { TERMS } from 'common/paths';
// import { PERSON } from 'common/actions';
// // import { ok, PERSON } from '../../common/actions';
// import { data } from 'common/utils';
// import * as api from 'common/api';

// import Select from 'react-select';
// // import AsyncSelect from 'react-select/lib/Async';

// const CalendarEvent = ({ page, patient, selectedDate, selectedDuration, description }) => (
//     <div>
//         <div>
//             <CalendarEventCreationSteps current={page} patient={patient} selectedDate={selectedDate} />
//         </div>
//         <div>
//             {page === 'patient' ? <CalendarEventPatientStep patient={patient} /> : null}
//             {page === 'date' ? <CalendarEventDateStep selectedDate={selectedDate} selectedDuration={selectedDuration} /> : null}
//             {page === 'details' ? <CalendarEventDetailsStep description={description} /> : null}
//         </div>
//     </div>
// );

// const mapS2P = (state, ownProps) => {
//     // console.log(state, ownProps);
//     return state.app.calendarEvent;
// };

// export default connect(mapS2P, {})(CalendarEvent);

// const state0 = {
//     page: 'patient',
//     patient: {
//         selected: null,
//         options: [],
//         loading: false
//     },
//     selectedDate: null,
//     selectedDuration: 0,
//     description: null
// };

// export const reducer = (state = state0, { type, payload }) => {
//     return state;
//     // switch (type) {
//     //     case ok(INSERT_PERSON):
//     //         { }
//     // }
// }

// const CalendarEventCreationSteps = ({ current, patient, selectedDate }) => (
//     <Step.Group>
//         <Step active={current === 'patient'}>
//             <Icon name='bed' />
//             <Step.Content>
//                 <Step.Title>{t("Patient")}</Step.Title>
//                 <Step.Description>{t("Select from existing or register one now")}</Step.Description>
//             </Step.Content>
//         </Step>
//         <Step active={current === 'details'} disabled={patient === null}>
//             <Icon name='calendar alternate outline' />
//             <Step.Content>
//                 <Step.Title>{t("Date")}</Step.Title>
//                 <Step.Description>{t("Check availability")}</Step.Description>
//             </Step.Content>
//         </Step>
//         <Step active={current === 'details'} disabled={patient === null || selectedDate === null}>
//             <Icon name='info' />
//             <Step.Content>
//                 <Step.Title>{t("Details")}</Step.Title>
//             </Step.Content>
//         </Step>
//     </Step.Group>
// );

// // export default CalendarEventCreationSteps


// // const selectOptions = inputValue =>
// //     new Promise(resolve => {
// //         api.getPersons({
// //             qry: inputValue
// //         }).then((response) => {
// //             // parse data
// //             resolve(response.data);
// //         }).catch((e) => {
// //             resolve([]);
// //         });
// //     });

// const PersonForm = reduxForm({ form: PERSON })(({ handleSubmit, ...props }) => (
//     <Form size='large'>
//         <Form.Field>
//             <label>Name</label>
//             <FormTextInput name='name' />
//         </Form.Field>
//         <Form.Field>
//             <label>Born in</label>
//             <FormSelect name='birthYear' options={data.range2array(1910, (new Date()).getFullYear()).map(e => ({ value: e, label: e }))} />
//         </Form.Field>
//         <Form.Field>
//             <label>Gender</label>
//             <FormSelect name='gender' options={[...data.genders]} />
//         </Form.Field>
//         <Form.Field>
//             <label>Date</label>
//             <FormDatePicker name='d1' />
//         </Form.Field>
//         <FormButton onClick={handleSubmit} fluid positive size="large">
//             Save
//         </FormButton>
//     </Form>
// ));


// // onInputChange={this.handleInputChange}

// const CalendarEventPatientStep = ({ patient: { selected, options, loading } }) => (
//     <div>
//         <div>
//             <PersonForm />
//         </div>
//         <div>
//             <Select value={selected} isLoading={loading} options={options} onMenuOpen={({ ...args }) => { console.log(this, args) }} onInputChange={({ ...args }) => { console.log(this, args) }} />
//         </div>
//     </div>
// );

// const CalendarEventDateStep = ({ handleSubmit, ...props }) => {

// }

// const CalendarEventDetailsStep = ({ handleSubmit, ...props }) => {

//     const descriptionTxt = "";
//     const saveTxt = t("Create");

//     return (
//         <Form size='large'>
//             <Form.Field>
//                 <FormTextArea name='description' placeholder={descriptionTxt} />
//             </Form.Field>
//             <FormButton onClick={handleSubmit} fluid positive size="large">
//                 {saveTxt}
//             </FormButton>
//         </Form>
//     );
// }



// // const getSession = (state) => state.session || {};
// // const getTimezone = (session) => session.timezone;
// // const getLocale = (session) => session.locale;

// // const mapS2P = (state, ownProps) => ({
// //     initialValues: {
// //         timezone: getTimezone(getSession(state)),
// //         locale: getLocale(getSession(state)),
// //         url: ownProps.callbackURL
// //     }
// // });

// // export default connect(mapS2P)(reduxForm({form: SIGNUP })(CalendarEventForm));