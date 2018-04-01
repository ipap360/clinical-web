import _ from 'lodash';
import axios from 'axios';

var ReqRegistry = {};
const resetState = {
  isFetching: false,
  isErrorMsg: '',
}
const api = {
  register: (action, {url, method, ...opts }) => {
    url = url || '';
    method = method || 'get';
    ReqRegistry[action] = Object.assign({}, { url, method, ...opts });
    return api;
  },
  build: (action) => {
    let { method, url, ...opts } = ReqRegistry[action];
    if (!url) throw "Action not registered!";
    if (!axios[method]) throw "Invalid fetch method!";
    return _.partial(axios[method], url, _, opts);
  },
  fetch: (action, args, reducer, options) => {
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
      // console.log(action, args, callback, options, dispatch, getState);
      try {
        const _fetch = api.build(action);
        // console.log(_fetch);
        dispatch({
          type: opts.startType,
          reducer: opts.startReducer,
        });
        _fetch('EVENTS', args).then((response) => {
          dispatch({
            type: action,
            reducer: (state, action) => {
              return (_.isFunction(reducer)) ? reducer.apply(this, [Object.assign({...state, ...resetState}), action]): null;
            },
            payload: response.data
          });
        }).catch((error) => {
          dispatch({
            type: opts.errorType,
            reducer: (state, action) => {
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