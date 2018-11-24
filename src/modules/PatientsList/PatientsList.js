import React, { Component } from "react";
import { SimpleTable, tableStyles, headerBG } from "../../components";
import { consume } from "../../context";
import TopBar from "../TopBar";
import Main from "../Main";
import { fetchPatients, getPatients } from "./store";

import {
    Paper,
    Table,
    TableCell,
    TableRow,
    TableHead,
    Toolbar
} from "@material-ui/core";

const GenderIcon = ({ gender }) => {
    if (!gender) return null;
    const icon = gender === "MALE" ? "fas fa-mars" : "fas fa-venus";
    return (
        <div className="icon-gender">
            <span className={icon} />
        </div>
    );
};

const styles = theme => ({
    ...tableStyles(theme),
    root: {},
    header: {
        backgroundColor: headerBG,
        width: "100%"
    }
});

class PatientsList extends Component {
    constructor(props) {
        super(props);
        this.topRef = React.createRef();
    }

    componentDidMount() {
        const { fetchPatients } = this.props;
        fetchPatients();
    }

    componentWillUnmount() {}

    render() {
        const { patients, t, classes } = this.props;
        // console.log(patients);

        const data = {
            id: "Patients",
            head: [],
            // head: [
            //     [
            //         { t: "", w: 30 },
            //         { t: t("Name") },
            //         { t: t("Code"), w: 80 },
            //         t("Notes")
            //     ]
            // ],
            body: patients.map((patient, i) => {
                const { id, name, code, gender, notes } = patient;
                const icon = <GenderIcon gender={gender} />;
                return {
                    id,
                    columns: [{ t: icon }, name, code, { t: notes }],
                    style: {
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden"
                    }
                };
            })
        };

        let container;
        const ref = this.topRef.current;
        if (ref != null) {
            container = ref.bodyRef && ref.bodyRef.current;
        }

        const PatientsListTitle = () => (
            <Toolbar className={classes.header} disableGutters>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 30, flex: "none" }}>
                                &nbsp;
                            </TableCell>
                            <TableCell
                                style={{
                                    width: 300,
                                    maxWidth: "40%",
                                    flex: "none"
                                }}
                            >
                                {t("Name")}
                            </TableCell>
                            <TableCell style={{ width: 80, flex: "none" }}>
                                {t("Code")}
                            </TableCell>
                            <TableCell style={{ width: 300, flex: "1 auto" }}>
                                {t("Notes")}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </Toolbar>
        );

        return (
            <React.Fragment>
                <TopBar title="Patients" body={<PatientsListTitle />} />
                <Main>
                    <Paper square>
                        <SimpleTable
                            data={data}
                            // className={classes.fixedHeader}
                            headerContainer={container}
                            padding="checkbox"
                        />
                    </Paper>
                </Main>
            </React.Fragment>
        );
    }
}

const s2p = state => ({
    patients: getPatients(state)
});

const d2p = {
    fetchPatients
};

const store = { s2p, d2p };
export default consume({ store, styles })(PatientsList);
