import React, { Component } from "react";
import {
    Paper,
    Icon,
    IconButton,
    Button,
    Toolbar,
    Typography
} from "@material-ui/core";
import { TTypography } from "../../components";
import TopBar from "../TopBar";
import CalendarDayTitle from "./CalendarDayTitle";

class CalendarTopBar extends Component {
    render() {
        const {
            classes,
            dates,
            periodTitle,
            prevWeek,
            nextWeek,
            thisWeek
        } = this.props;
        const { topbarBody } = classes;
        return (
            <TopBar
                title="Calendar"
                nav={
                    <React.Fragment>
                        <IconButton
                            variant="outlined"
                            color="inherit"
                            onClick={() => prevWeek()}
                        >
                            <Icon fontSize="inherit">arrow_left</Icon>
                        </IconButton>
                        <Typography color="inherit" variant="title">
                            {periodTitle}
                        </Typography>
                        <IconButton
                            variant="outlined"
                            color="inherit"
                            onClick={() => nextWeek()}
                        >
                            <Icon fontSize="inherit">arrow_right</Icon>
                        </IconButton>
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() => thisWeek()}
                        >
                            <TTypography color="inherit">Today</TTypography>
                        </Button>
                    </React.Fragment>
                }
                body={
                    <Paper className={topbarBody} square>
                        <Toolbar disableGutters>
                            {dates.map((d, i) => {
                                return <CalendarDayTitle key={i} d={d} />;
                            })}
                        </Toolbar>
                    </Paper>
                }
            />
        );
    }
}

export default CalendarTopBar;
