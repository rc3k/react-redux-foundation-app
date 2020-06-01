import * as collectionActions from './collection';
import * as itemActions from './item';
import { combineActions } from './lib';

export default combineActions(collectionActions, itemActions);
