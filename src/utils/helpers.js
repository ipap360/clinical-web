// import _ from "lodash";
import snakeCase from "lodash/snakeCase";
import config from "../app.config";

const { appName } = config;

const statuses = {
    ok: "OK",
    fail: "FAILED",
    init: "INITIALIZED",
    chg: "CHANGED",
    fin: "FINISHED",
    compl: "COMPLETED",
    stop: "STOPPED"
};

const commands = {
    get: "GET",
    ins: "INSERT",
    del: "DELETE",
    upd: "UPDATE",
    ups: "UPSERT",
    cp: "COPY",
    mv: "MOVE"
};

export const createAction = type => (payload, meta) => {
    return {
        type,
        payload,
        meta
    };
};

export const createAsyncNames = (...args) => {
    const name = createActionName.apply(this, args);
    return {
        _: name,
        OK: setOK(name),
        FAILED: setFail(name),
        ALWAYS: setFin(name)
    };
};

export const createAsyncAction = (action, api) => (
    params,
    meta
) => dispatch => {
    const type = typeof action === "object" ? action._ : action;
    dispatch({ type });
    api(params)
        .then(response => {
            dispatch({
                type: setOK(type),
                payload: response.data
            });
        })
        .catch(e => {
            dispatch({
                type: setFail(type),
                payload: e
            });
        })
        .then(() => {
            dispatch({
                type: setFin(type)
            });
        });
};

export const createActionName = (name, ns = null, options = {}) => {
    const { status, command } = options;

    let fullname = name;

    fullname = command ? `${commands[command]}_${fullname}` : fullname;
    fullname = status ? `${fullname}:${statuses[status]}` : fullname;
    fullname = ns ? `${snakeCase(ns).toUpperCase()}/${fullname}` : fullname;

    return `${appName}/${fullname}`;
};

// export const decorateActionName = (fullname, { status, command }) => {
//     const arr = fullname.split("/");
//     let name = arr.pop();
//     if (command) {
//         let cmd = name.split("_");
//         if (cmd.length === 2) {
//             cmd[0] = commands[command];
//             name = cmd.join("-");
//         }
//     }
//     if (status) {
//         let st = name.split(":");
//         if (st.length === 2) {
//             st[1] = statuses[status] || "";
//             name = st.join(":");
//         }
//     }
//     arr.push(name);
//     return arr.join("/");
// }

export const setActionStatus = (fullname, status) => {
    let arr = fullname.split("/");
    let name = arr.pop();
    let st = name.split(":");
    if (status && statuses[status]) {
        st[1] = statuses[status];
        name = st.join(":");
    } else {
        name = st[0];
    }
    arr.push(name);
    return arr.join("/");
};

export const setOK = name => setActionStatus(name, "ok");
export const setFail = name => setActionStatus(name, "fail");
export const setFin = name => setActionStatus(name, "fin");
export const setChg = name => setActionStatus(name, "chg");
