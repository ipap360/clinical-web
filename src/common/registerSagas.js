import sagaManager from './sagaManager';

export default (...sagas) => sagaManager.register(...sagas);