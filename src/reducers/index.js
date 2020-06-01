import collectionReducer from './collection';
import itemReducer from './item';
import { reduceReducers } from './lib';

export default reduceReducers(collectionReducer, itemReducer);
