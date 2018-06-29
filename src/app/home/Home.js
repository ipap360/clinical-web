import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { } from 'semantic-ui-react';

import { date } from 'common/utils';
import t from 'i18n';



const demo = {
    "2018-06-25": {
        isToday: false,
        workingDay: true,
        
        maxCapacity: {
            MALE: 5,
            FEMALE: 8
        },
        details: {
            day: 25,
            month: "ΙΟΥΝ",
            year: 2018,
            name: "ΔΕ"
        },
        events: [
            {
                id: 1,
                description: "CA",
                name: "Παπαδημητρίου",
                gender: "MALE",
                duration: 1,
            }
        ]
    }
};

export default class Home extends Component {

    constructor(props) {

        super(props);

        const today = date.midnight(new Date());

        this.dates = [];

        for (let i = 1; i < 8; i++) {
            let loopdate = new Date(today);
            loopdate.setUTCDate(today.getUTCDate() - today.getUTCDay() + i);
            this.dates.push(loopdate);
        }

        console.log(this.dates);
    }

    dayClick = () => {
        console.log(this)
    }

    render() {
        return (
            <div className='calendar'>
                <div className='calendar-header'>
                    <Link to='/calendar-event/add'>Add</Link>
                </div>
                <div className='calendar-body calendar-week'>
                    {this.dates.map((d) => (
                        <div id={d.getTime()} className='calendar-day' onClick={this.dayClick.bind(this)}>
                            <div className='header'>
                                <div className='name'>
                                    {t("ShortDays", d.getUTCDay())}
                                </div>
                                <div className='value' >
                                    {d.getUTCDate()}
                                </div>
                            </div>
                            <div className='content'>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
