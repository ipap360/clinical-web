import React from 'react';
import BasePicker from 'material-ui-pickers/_shared/BasePicker';
import Calendar from 'material-ui-pickers/DatePicker/Calendar';
import styled from 'styled-components';

const SmallCalendar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
/* eslint-disable no-unused-vars */
export default ({ value, onChange }) => (
    <BasePicker autoOk={true} value={value} onChange={onChange}>
        {
            ({
                date,
                handleAccept,
                handleChange,
                handleClear,
                handleDismiss,
                handleSetTodayDate,
                handleTextFieldChange,
                pick12hOr24hFormat,
            }) => {
                // console.log(handleChange);
                return (
                    <SmallCalendar>
                        <Calendar date={date} onChange={handleChange} />
                    </SmallCalendar>
                )
            }
        }
    </BasePicker>
);