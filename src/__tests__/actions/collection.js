import {
  setCollection, addItem, removeItem, loadCollection, deleteItemFromCollection,
} from '../../actions/collection';
import { deleteItemRequest, loadCollectionRequest } from '../../requests';

jest.mock('../../requests', () => ({
  loadCollectionRequest: jest.fn(),
  deleteItemRequest: jest.fn(),
}))

describe('setCollection action creator', () => {
  it('creates an action', () => {
    expect(setCollection({
      name: 'collection',
    })).toEqual({
      type: 'SET_COLLECTION',
      payload: {
        name: 'collection',
      },
      error: false,
      meta: {},
    })
  });
  it('creates an error action', () => {
    const error = new Error();
    expect(setCollection(error, {}, true)).toEqual({
      type: 'SET_COLLECTION',
      payload: error,
      error: true,
      meta: {},
    })
  });
});

describe('addItem action creator', () => {
  it('creates an action', () => {
    expect(addItem({
      id: null,
    })).toEqual({
      type: 'ADD_ITEM',
      payload: {
        id: null,
      },
      error: false,
      meta: {},
    })
  });
  it('creates an error action', () => {
    const error = new Error();
    expect(addItem(error, {}, true)).toEqual({
      type: 'ADD_ITEM',
      payload: error,
      error: true,
      meta: {},
    })
  });
});

describe('removeItem action creator', () => {
  it('creates an action', () => {
    expect(removeItem({
      id: 'item-id',
    })).toEqual({
      type: 'REMOVE_ITEM',
      payload: {
        id: 'item-id',
      },
      error: false,
      meta: {},
    })
  });
  it('creates an error action', () => {
    const error = new Error();
    expect(removeItem(error, {}, true)).toEqual({
      type: 'REMOVE_ITEM',
      payload: error,
      error: true,
      meta: {},
    })
  });
});

describe('removeItem action creator', () => {
  it('creates an action', () => {
    expect(removeItem({
      id: 'item-id',
    })).toEqual({
      type: 'REMOVE_ITEM',
      payload: {
        id: 'item-id',
      },
      error: false,
      meta: {},
    })
  });
  it('creates an error action', () => {
    const error = new Error();
    expect(removeItem(error, {}, true)).toEqual({
      type: 'REMOVE_ITEM',
      payload: error,
      error: true,
      meta: {},
    })
  });
});

describe('loadCollection thunk', () => {
  it('should set the "REQUESTED" status', async () => {
    const mockDispatch = jest.fn();
    await loadCollection('users')(mockDispatch);
    const setCollectionAction = setCollection(
      [],
      {
        collectionName: 'users',
        status: 'REQUESTED',
      },
      false,
    );
    expect(mockDispatch.mock.calls[0][0]).toEqual(setCollectionAction);
  });

  it('should set the "SUCCESS" status', async () => {
    const mockDispatch = jest.fn();
    loadCollectionRequest.mockReturnValue(Promise.resolve([1, 2, 3]));
    await loadCollection('users')(mockDispatch);
    const setCollectionAction = setCollection(
      [1, 2, 3],
      {
        collectionName: 'users',
        status: 'SUCCESS',
      },
      false,
    );
    expect(mockDispatch.mock.calls[1][0]).toEqual(setCollectionAction);
  });

  it('should set the "FAILURE" status', async () => {
    const mockDispatch = jest.fn();
    const anError = new Error('An API error');
    loadCollectionRequest.mockImplementation(() => {
      throw anError;
    });
    await loadCollection('users')(mockDispatch);
    const setCollectionAction = setCollection(
      anError,
      {
        collectionName: 'users',
        status: 'FAILURE',
      },
      true,
    );
    expect(mockDispatch.mock.calls[1][0]).toEqual(setCollectionAction);
  });
});

describe('deleteItemFromCollection thunk', () => {
  it('should set the "REQUESTED" status', async () => {
    const mockDispatch = jest.fn();
    await deleteItemFromCollection('users', 123)(mockDispatch);
    const removeItemAction = removeItem(
      null,
      {
        collectionName: 'users',
        status: 'REQUESTED',
      },
      false,
    );
    expect(mockDispatch.mock.calls[0][0]).toEqual(removeItemAction);
  });

  it('should set the "SUCCESS" status', async () => {
    const mockDispatch = jest.fn();
    deleteItemRequest.mockReturnValue(Promise.resolve(123));
    await deleteItemFromCollection('users', 123)(mockDispatch);
    const removeItemAction = removeItem(
      123,
      {
        collectionName: 'users',
        status: 'SUCCESS',
      },
      false,
    );
    expect(mockDispatch.mock.calls[1][0]).toEqual(removeItemAction);
  });

  it('should set the "FAILURE" status', async () => {
    const mockDispatch = jest.fn();
    const anError = new Error('An API error');
    deleteItemRequest.mockImplementation(() => {
      throw anError;
    });
    await deleteItemFromCollection('users', 123)(mockDispatch);
    const removeItemAction = removeItem(
      anError,
      {
        collectionName: 'users',
        status: 'FAILURE',
      },
      true,
    );
    expect(mockDispatch.mock.calls[1][0]).toEqual(removeItemAction);
  });
});
