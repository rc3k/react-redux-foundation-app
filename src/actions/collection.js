import { createAction } from './lib';
import { loadCollectionRequest, deleteItemRequest } from '../requests';

export const SET_COLLECTION = 'SET_COLLECTION';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM'

export const [
  setCollection,
  addItem,
  removeItem,
] = [SET_COLLECTION, ADD_ITEM, REMOVE_ITEM].map(createAction);

export const loadCollection = (collectionName) => async (dispatch) => {
  dispatch(setCollection([], {
    collectionName,
    status: 'REQUESTED',
  }, false));
  try {
    const response = await loadCollectionRequest(collectionName);

    dispatch(setCollection(response, {
      collectionName,
      status: 'SUCCESS',
    }, false));
  } catch (error) {
    dispatch(setCollection(error, {
      collectionName,
      status: 'FAILURE',
    }, true));
  }
}

export const deleteItemFromCollection = (collectionName, itemId) => async (dispatch) => {
  dispatch(removeItem(null, {
    collectionName,
    status: 'REQUESTED',
  }, false));

  try {
    const response = await deleteItemRequest(collectionName, itemId);

    dispatch(removeItem(response, {
      collectionName,
      status: 'SUCCESS',
    }, false));
  } catch (error) {
    dispatch(removeItem(error, {
      collectionName,
      status: 'FAILURE',
    }, true));
  }
}
