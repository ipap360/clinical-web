import { fork, call, put, all, take, join, takeEvery, spawn } from 'redux-saga/effects';
import { registerSagas } from '../common';

import * as session from './session';


// import { history, actions } from '../store';
import { setOK, setFail, setFin, createActionName, createAction } from './helpers';

// action creators
// export const fetchSession = createAction(FETCH_SESSION);
// export const sessionUpdated = createAction(SESSION_UPDATED);

