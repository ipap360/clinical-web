import { reduxForm } from 'redux-form';

import FormButton from './forms/FormButton';
import FormTextInput from './forms/FormTextInput';
// import FormHiddenInput from './forms/FormHiddenInput';
import Navigation from './Navigation';
import RichText from './RichText';
import BackgroundSegment from './BackgroundSegment';
import ActionButton from './ActionButton';
import IconedMessage from './status/IconedMessage';
import LoadingMessage from './status/LoadingMessage';
import SuccessMessage from './status/SuccessMessage';
import FailureMessage from './status/FailureMessage';

// export named
export {
    reduxForm as connectForm,
    FormButton,
    FormTextInput,    
    // FormHiddenInput,    
    RichText,
    ActionButton,
    IconedMessage,
    LoadingMessage,
    SuccessMessage,
    FailureMessage,
    Navigation,
    BackgroundSegment
};