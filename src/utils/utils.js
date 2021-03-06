export { isObject, snakeCase, isFunction } from "lodash/core";

const getPrevious = history => {
    return (
        history.location &&
        history.location.state &&
        history.location.state.prev
    );
};

export const onSavePage = history => {
    if (!history) return;
    const prev = getPrevious(history);
    if (prev) {
        history.push(prev, { prev: window.location.pathname });
    } else {
        history.goBack();
    }
};

export const onDelete = history => {
    if (!history) return;
    const prev = getPrevious(history);
    if (prev) {
        history.replace(prev, { prev: window.location.pathname });
    } else {
        history.goBack();
    }
};

export const base64 = {
    decode: function(str) {
        return decodeURIComponent(
            Array.prototype.map
                .call(atob(str), function(c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );
    },
    encode: function(str) {
        return btoa(
            encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(
                match,
                p1
            ) {
                return String.fromCharCode("0x" + p1);
            })
        );
    },
};

export const log = {
    debug: function(...args) {
        if (process.env.NODE_ENV !== "production") {
            console.trace(...args);
        }
    },
    warn: function(...args) {
        if (typeof console.warn === "function") {
            console.warn(...args);
        }
    },
};

export const fromQueryParams = a => {
    if (!a) return {};
    a = a.substr(1).split("&");
    var b = {};
    for (var i = 0; i < a.length; i++) {
        var p = a[i].split("=", 2);
        if (p.length !== 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
};

export const toQueryParams = (json = {}) => {
    const keys = Object.keys(json);
    return keys.length === 0
        ? ""
        : "?" +
              keys
                  .filter(key => json[key] !== undefined)
                  .map(function(key) {
                      return (
                          encodeURIComponent(key) +
                          "=" +
                          encodeURIComponent(json[key])
                      );
                  })
                  .join("&");
};

export const getQueryParam = (history, name) => {
    const search = history.location.search;
    return search ? new URLSearchParams(history.location.search).get(name) : "";
};

export const unAccentize = str =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const contains = (a = "", b = "") =>
    unAccentize(a.toUpperCase()).includes(unAccentize(b.toUpperCase()));

export const date = {
    midnight: function(d) {
        let da = new Date(d);
        da.setUTCHours(0);
        da.setUTCMinutes(0);
        da.setUTCSeconds(0);
        da.setUTCMilliseconds(0);
        return da;
    },
};

export const data = {
    genders: [
        {
            value: "MALE",
            label: "Male",
        },
        {
            value: "FEMALE",
            label: "Female",
        },
        {
            value: "UNKNOWN",
            label: "Unknown",
        },
    ],
    range2array: (start, end, step = 1) => {
        let arr = [];
        for (let i = start; i <= end; i = i + step) {
            arr.push(i);
        }
        return arr;
    },
};

export const uuid = a =>
    a
        ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
        : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
