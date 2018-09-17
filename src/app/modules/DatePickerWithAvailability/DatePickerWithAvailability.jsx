import React from 'react';
import { FormDateField } from '../../../components';
import moment from 'moment';
import classNames from 'classnames';

class DatePickerWithAvailability extends React.Component {

    componentWillMount() {
        const { fetchAvailability } = this.props;
        fetchAvailability({
            from: moment().format("YYYY-MM-DD"),
            to: moment().add(2, 'M').format("YYYY-MM-DD")
        });
    }

    render() {

        const { availability, ...props } = this.props;

        return (
            <FormDateField
                renderDay={(day, selectedDate, dayInCurrentMonth, dayComponent) => {
                    const date = day.format("YYYY-MM-DD");
                    const gi = availability[date];
                    return (<div className={classNames('day-indicator', {
                        [gi]: !!gi
                    })}>{dayComponent}</div>);
                }}
                {...props}
            />
        );

    }

}

export default DatePickerWithAvailability;