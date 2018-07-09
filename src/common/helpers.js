import _ from 'lodash';
import APP_NAME from '.';

const statuses = {
    ok: "OK",
    fail: "FAILED",
    init: "INITIALIZED",
    chg: "CHANGED",
    fin: "FINISHED",
    compl: "COMPLETED",
    stop: "STOPPED",
}

const commands = {
    get: "GET",
    ins: "INSERT",
    del: "DELETE",
    upd: "UPDATE",
    ups: "UPSERT",
    cp: "COPY",
    mv: "MOVE",
}

export const createAction = (type) => (payload) => ({
    type,
    payload
});

export const createActionName = (name, ns = null, { status, command }) => {

    let fullname = name;

    fullname = (command) ? `${commands[command]}_${fullname}` : fullname;
    fullname = (status) ? `${fullname}:${statuses[status]}` : fullname;
    fullname = (ns) ? `${_.snakeCase(ns).toUpperCase()}/${fullname}` : fullname;

    return `${APP_NAME}/${fullname}`;
}

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
}

export const setOK = (name) => setActionStatus(name, {status: 'ok'});
export const setFail = (name) => setActionStatus(name, {status: 'fail'});
export const setFin = (name) => setActionStatus(name, {status: 'fin'});
export const setChg = (name) => setActionStatus(name, {status: 'chg'});