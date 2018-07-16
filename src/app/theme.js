import { teal, red } from '@material-ui/core/colors';

export default {
    overrides: {
        MuiToolbar: {
        }
    },
    palette: {
        primary: {
            light: teal[100],
            main: teal[500],
            dark: teal[600],
        },
        secondary: {
            light: "#ff867f",
            main: red.A200,
            dark: "#c50e29",
        },
    },
};