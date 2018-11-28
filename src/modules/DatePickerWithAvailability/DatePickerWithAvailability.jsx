import React from "react";
import { FormDate } from "../../components";
import { consume } from "../../context";
import moment from "moment";
import classNames from "classnames";
import { fetchRoomAvailability, getAvailability } from "../Rooms";

const getAvailabilityForGender = (availability, gender) => {
    const ga = {};

    // eslint-disable-next-line
    Object.keys(availability).map(function(key, index) {
        ga[key] = gender ? availability[key][gender].toLowerCase() : "";
    });

    return ga;
};

class DatePickerWithAvailability extends React.Component {
    componentDidMount() {
        const { fetchRoomAvailability } = this.props;
        fetchRoomAvailability({
            from: moment()
                .startOf("week")
                .format("YYYY-MM-DD"),
            to: moment()
                .startOf("week")
                .add(2, "M")
                .format("YYYY-MM-DD")
        });
    }

    render() {
        const { availability, t, gender, ...props } = this.props;
        const ga = getAvailabilityForGender(availability, gender);
        // console.log(
        //     JSON.stringify(availability, 0, 4),
        //     JSON.stringify(ga, 0, 4)
        // );
        return (
            <FormDate
                renderDay={(
                    day,
                    selectedDate,
                    dayInCurrentMonth,
                    dayComponent
                ) => {
                    const date = day.format("YYYY-MM-DD");
                    const gi = ga[date];
                    return (
                        <div
                            className={classNames("day-indicator", {
                                [gi]: !!gi
                            })}
                        >
                            {dayComponent}
                        </div>
                    );
                }}
                {...props}
            />
        );
    }
}

const s2p = state => ({
    availability: getAvailability(state)
});

const d2p = { fetchRoomAvailability };
const store = { s2p, d2p };

export default consume({ store })(DatePickerWithAvailability);
