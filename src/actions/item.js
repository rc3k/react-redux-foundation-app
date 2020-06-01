import { createAction } from './lib';
import { loadItemRequest, putItemRequest, postItemRequest } from '../requests';

export const SET_ITEM = 'SET_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const UPDATE_ITEM_ATTRIBUTE = 'UPDATE_ITEM_ATTRIBUTE';

export const [
  updateItem,
  updateItemAttribute,
  setItem,
] = [UPDATE_ITEM, UPDATE_ITEM_ATTRIBUTE, SET_ITEM].map(createAction);

export const loadItem = (collectionName, itemId) => async (dispatch) => {
  dispatch(setItem({
    id: itemId,
  }, {
    status: 'REQUESTED',
  }, false));

  try {
    const response = await loadItemRequest(collectionName, itemId);

    dispatch(setItem(response, {
      status: 'SUCCESS',
    }, false));
  } catch (error) {
    dispatch(setItem(error, {
      status: 'FAILURE',
    }, true));
  }
}

const putOrPostRequest = (collectionName, fields) => {
  if (fields.id) {
    return putItemRequest(collectionName, fields);
  }
  return postItemRequest(collectionName, fields);
}

export const saveItem = (collectionName, fields, redirect) => async (dispatch) => {
  dispatch(setItem(fields, {
    status: 'REQUESTED',
  }, false));

  try {
    const response = await putOrPostRequest(collectionName, fields);

    dispatch(setItem(response, {
      status: 'SUCCESS',
    }, false));
    if (redirect) {
      redirect();
    }
  } catch (error) {
    dispatch(setItem(error, {
      status: 'FAILURE',
    }, true));
  }
}
