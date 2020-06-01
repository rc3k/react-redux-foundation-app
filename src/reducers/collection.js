import { SET_COLLECTION, ADD_ITEM, REMOVE_ITEM } from '../actions/collection';
import { addItemToArray, removeItemFromArray, updateObject } from './lib';

const defaultState = {
  example: {
    items: [],
    meta: {
      collectionName: 'example',
      state: null,
      key: 'id',
    },
  },
};

const updateCollectionState = (state, items, meta) => updateObject(state, {
  [meta.collectionName]: {
    items,
    meta: updateObject(state[meta.collectionName].meta, meta),
  },
})

const setCollection = (state, payload, meta) => {
  const isSuccess = meta.status === 'SUCCESS';
  return updateCollectionState(
    state,
    isSuccess ? payload : state[meta.collectionName].items,
    meta,
  );
}

const addItem = (state, payload, meta) => updateCollectionState(
  state,
  addItemToArray(
    state[meta.collectionName].items,
    payload,
  ),
  meta,
)

const removeItem = (state, payload, meta) => {
  const isSuccess = meta.status === 'SUCCESS';
  const oldCollection = state[meta.collectionName];
  return updateCollectionState(
    state,
    isSuccess ? removeItemFromArray(
      oldCollection.items,
      oldCollection.meta.key,
      payload,
    ) : oldCollection.items,
    meta,
  );
}

/**
 * collection reducer
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
export default (state = {}, action = {}) => {
  switch (action.type) {
    case SET_COLLECTION:
      return setCollection(state, action.payload, action.meta);
    case ADD_ITEM:
      return addItem(state, action.payload, action.meta);
    case REMOVE_ITEM:
      return removeItem(state, action.payload, action.meta);
    default:
      return updateObject(state, defaultState);
  }
};
