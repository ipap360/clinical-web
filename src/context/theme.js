import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline, colors } from "@material-ui/core";
export { withTheme } from "@material-ui/core";

const { teal, red } = colors;
const config = {
    overrides: {
        MuiToolbar: {}
    },
    palette: {
        primary: {
            light: teal[100],
            main: teal[500],
            dark: teal[600]
        },
        secondary: {
            light: "#ff867f",
            main: red.A200,
            dark: "#c50e29"
        }
    }
};

export default Component => props => {
    const theme = createMuiTheme(config);
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...props} />
        </MuiThemeProvider>
    );
};
