import { default as DateUtils, withDateUtils } from "./dates";
import { default as I18n, withI18n } from "./i18n";
import { default as Store } from "./redux";
import { default as Theme, withTheme } from "./theme";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";

export const provide = Component => {
    return compose(
        DateUtils,
        Theme,
        I18n,
        Store
    )(Component);
};

export const consume = (params = {}) => Component => {
    const {
        store = true,
        styles = null,
        theme = false,
        router = false,
        i18n = true,
        date = false
    } = params;

    let HOCs = [];
    if (store) {
        if (typeof store === "object") {
            HOCs.push(
                connect(
                    store.s2p,
                    store.d2p,
                    null,
                    store.opts
                )
            );
        } else {
            HOCs.push(connect());
        }
    }

    if (styles) {
        HOCs.push(withStyles(styles));
    }

    if (theme) {
        HOCs.push(withTheme);
    }

    if (i18n) {
        if (typeof i18n === "object") {
            HOCs.push(withI18n(i18n.ns));
        } else {
            HOCs.push(withI18n());
        }
    }

    if (router) {
        HOCs.push(withRouter);
    }

    if (date) {
        HOCs.push(withDateUtils);
    }

    return compose(...HOCs)(Component);
};

export { changeLanguage } from "./i18n";
