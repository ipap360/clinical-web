import React from "react";
import { FormDate } from "../../components";
import { consume } from "../../context";
import moment from "moment";
import classNames from "classnames";
import { fetchRoomAvailability, getAvailabilityWithIndicators } from "../Rooms";

const getAvailabilityForGender = (availability, gender) => {
    const ga = {};

    // eslint-disable-next-line
    Object.keys(availability).map(function(key, index) {
        ga[key] = gender ? availability[key][gender] : {};
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
        const {
            availability,
            t,
            classes,
            theme,
            gender,
            // here in order to avoid being spread to DatePicker
            fetchRoomAvailability,
            ...props
        } = this.props;

        const ga = getAvailabilityForGender(availability, gender);

        return (
            <FormDate
                disablePast={true}
                renderDay={(
                    day,
                    selectedDate,
                    dayInCurrentMonth,
                    dayComponent
                ) => {
                    const date = day.format("YYYY-MM-DD");
                    const gi = ga[date];
                    const style =
                        gi && gi.color
                            ? {
                                  backgroundColor: gi.color,
                                  "& > *": {
                                      color: theme.palette.getContrastText(
                                          gi.color
                                      )
                                  }
                              }
                            : {};

                    return (
                        <div
                            className={classNames({
                                [classes.dayIndicator]: gi && gi.color
                            })}
                            style={{
                                borderRadius: 5,
                                ...style
                            }}
                            title={
                                gi && gi.text
                                    ? gi.text + " (" + gi.number + ")"
                                    : ""
                            }
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
    availability: getAvailabilityWithIndicators(state)
});

const d2p = { fetchRoomAvailability };
const store = { s2p, d2p };

const styles = theme => ({
    dayIndicator: {
        "& > *": {
            color: "inherit !important"
        }
    }
});

export default consume({ store, theme: true, styles })(
    DatePickerWithAvailability
);
