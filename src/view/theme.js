import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blueGrey, pink } from '@material-ui/core/colors';

// #607D8B #37474F #F06292
const theme = createMuiTheme({
    palette: {
        primary: {
            light: blueGrey[300],
            main: blueGrey[500],
            dark: blueGrey[800],
        },
        secondary: {
            light: pink[100],
            main: pink[300],
            dark: pink[500],
        },
    },
});

export default (Component) => (props) => (
    <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
    </MuiThemeProvider>
);