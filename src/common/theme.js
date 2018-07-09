import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

export default (config) => (Component) => (props) => {

    const theme = createMuiTheme(config);

    // CssBaseline kickstart an elegant, consistent, and simple baseline to build upon
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...props} />
        </MuiThemeProvider>
    );
}