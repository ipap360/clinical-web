import _ from 'lodash';
import axios from 'axios';

var ReqRegistry = {};
const resetState = {
    isFetching: false,
    isErrorMsg: '',
}
const api = {
    register: (action, { url, method, ...opts }) => {
        url = url || '';
        method = method || 'get';
        ReqRegistry[action] = Object.assign({}, { url, method, ...opts });
        return api;
    },
    resolveURL: (url, data) => {
        const regex = /\{[^{}]+\}/g;

        var resolvedURL = url;
        var newDATA = Object.assign({}, { ...data });

        let vars = url.match(regex) || [];
        vars.forEach((match, i) => {
            const key = match.substring(1, match.length - 1);
            if (data.hasOwnProperty(key)) {
                resolvedURL = resolvedURL.replace(new RegExp(match, "g"), data[key]);
                delete newDATA[key];
            }
        });

        return { resolvedURL, newDATA };
    },
    params: (data) => {
        return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
    },
    build: (action, data) => {
        const { method, url, ...opts } = ReqRegistry[action];
        if (!url) throw "Action not registered!";
        const { resolvedURL, newDATA } = api.resolveURL(url, data);
        switch (method.toLowerCase()) {
            case 'post':
            case 'put':
            case 'patch':
                return _.partial(axios[method], resolvedURL, newDATA, opts);
            case 'head':
            case 'options':
            case 'delete':
                return _.partial(axios[method], resolvedURL, opts);
            default:
                // get
                return _.partial(axios.get, resolvedURL + '?' + api.params(newDATA), opts);
        }
    },
    request: (action, args, reducer, options) => {
        const opts = Object.assign({}, {
            "startType": 'START',
            "errorType": 'ERROR',
            "startReducer": (state, action) => {
                return Object.assign({}, {
                    ...state,
                    ...resetState,
                    isFetching: true
                });
            },
            "errorReducer": (state, action) => {
                return Object.assign({}, {
                    ...state,
                    ...resetState,
                    isErrorMsg: action.payload || ''
                });
            },
        }, options);
        return (dispatch, getState) => {
            try {
                const _req = api.build(action, args);
                dispatch({
                    type: opts.startType,
                    reducer: opts.startReducer,
                });
                _req('EVENTS').then((response) => {
                    dispatch({
                        type: action,
                        reducer: (state, action) => {
                            return (_.isFunction(reducer)) ? reducer.apply(this, [Object.assign({ ...state, ...resetState }), action]) : null;
                        },
                        payload: response.data
                    });
                }).catch((error) => {
                    dispatch({
                        type: opts.errorType,
                        reducer: (state, action) => {
                            console.log(state, action);
                            return opts.errorReducer.apply(this, [Object.assign(state, {
                                isFetching: false,
                                isErrorMsg: '',
                            }),
                                action,
                            ]);
                        },
                        payload: error
                    });
                });
            } catch (e) {
                console.error(e);
            }
        };
    }
};

export default api;