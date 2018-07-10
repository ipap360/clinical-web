import reducerRegistry from './reducerRegistry';

export default (name, reducer) => reducerRegistry.register(name, reducer);