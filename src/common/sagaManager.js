import * as effects from 'redux-saga/effects';

class SagaManager {

    constructor() {
        // this._emitChange = null;
        this._sagas = [];
        this._runner = null;
    }

    // getSagas() {
    //     return { ...this._sagas };
    // }

    register(...sagas) {

        this._sagas = [...this._sagas, ...sagas];
        // if (this._emitChange) {
        //     this._emitChange(this.getSagas());
        // }

        this.run();
    }

    // setChangeListener(listener) {
    //     this._emitChange = listener;
    // }

    init(runner) {
        this._runner = runner;
        this.run();
    }

    run() {
        if (this._runner !== null) {
            this._sagas.map(saga => {
                if (typeof saga === 'function') {
                    return this._runner(saga.bind(null, { ...effects }));
                }
                return saga;
            });
        }
    }
}

export default new SagaManager();