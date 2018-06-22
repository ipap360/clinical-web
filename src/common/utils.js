export const base64 = {
    decode: function (str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    },
    encode: function (str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    },
};

export const log = {
    debug: function (...args) {
        if (process.env.NODE_ENV !== 'production') {
            console.trace(...args);
        }
    },
    warn: function (...args) {
        if (typeof console.warn === 'function') {
            console.warn(...args);
        }
    }
}

export const fromQueryParams = (a) => {
    if (!a) return {};
    a = a.substr(1).split('&');
    var b = {};
    for (var i = 0; i < a.length; i++) {
        var p = a[i].split('=', 2);
        if (p.length !== 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

export const toQueryParams = (json = {}) => {
    const keys = Object.keys(json);
    return (keys.length === 0) ? '' : '?' + keys.map(function (key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
    }).join('&');
}