import {
  updateItem,
  updateItemAttribute,
  setItem,
  loadItem,
  saveItem,
} from '../../actions/item';
import { loadItemRequest, putItemRequest, postItemRequest } from '../../requests';

jest.mock('../../requests', () => ({
  loadItemRequest: jest.fn(),
  putItemRequest: jest.fn(),
  postItemRequest: jest.fn(),
}))

describe('updateItem action creator', () => {
  it('creates an action', () => {
    expect(updateItem({
      id: 'item-id',
    })).toEqual({
      type: 'UPDATE_ITEM',
      payload: {
        id: 'item-id',
      },
      error: false,
      meta: {},
    })
  });
  it('creates an error action', () => {
    const error = new Error();
    expect(updateItem(error, {}, true)).toEqual({
      type: 'UPDATE_ITEM',
      payload: error,
      error: true,
      meta: {},
    })
  });
});

describe('updateItemAttribute action creator', () => {
  it('creates an action', () => {
    expect(updateItemAttribute({
      attribute: 'id',
      value: 'item-id-updated',
    })).toEqual({
      type: 'UPDATE_ITEM_ATTRIBUTE',
      payload: {
        attribute: 'id',
        value: 'item-id-updated',
      },
      error: false,
      meta: {},
    })
  });
  it('creates an error action', () => {
    const error = new Error();
    expect(updateItemAttribute(error, {}, true)).toEqual({
      type: 'UPDATE_ITEM_ATTRIBUTE',
      payload: error,
      error: true,
      meta: {},
    })
  });
});

describe('setItem action creator', () => {
  it('creates an action', () => {
    expect(setItem({
      name: 'Item',
    })).toEqual({
      type: 'SET_ITEM',
      payload: {
        name: 'Item',
      },
      error: false,
      meta: {},
    })
  });
  it('creates an error action', () => {
    const error = new Error();
    expect(setItem(error, {}, true)).toEqual({
      type: 'SET_ITEM',
      payload: error,
      error: true,
      meta: {},
    })
  });
});

describe('loadItem thunk', () => {
  it('should set the "REQUESTED" status', async () => {
    const mockDispatch = jest.fn();
    await loadItem('users', 123)(mockDispatch);
    const loadItemAction = setItem(
      {
        id: 123,
      },
      {
        status: 'REQUESTED',
      },
      false,
    );
    expect(mockDispatch.mock.calls[0][0]).toEqual(loadItemAction);
  });

  it('should set the "SUCCESS" status', async () => {
    const mockDispatch = jest.fn();
    loadItemRequest.mockReturnValue(Promise.resolve(123));
    await loadItem('users', 123)(mockDispatch);
    const loadItemAction = setItem(
      123,
      {
        status: 'SUCCESS',
      },
      false,
    );
    expect(mockDispatch.mock.calls[1][0]).toEqual(loadItemAction);
  });

  it('should set the "FAILURE" status', async () => {
    const mockDispatch = jest.fn();
    const anError = new Error('An API error');
    loadItemRequest.mockImplementation(() => {
      throw anError;
    });
    await loadItem('users', 123)(mockDispatch);
    const loadItemAction = setItem(
      anError,
      {
        status: 'FAILURE',
      },
      true,
    );
    expect(mockDispatch.mock.calls[1][0]).toEqual(loadItemAction);
  });
});

describe('saveItem thunk', () => {
  it('should set the "REQUESTED" status', async () => {
    const mockDispatch = jest.fn();
    await saveItem('users', { name: 'Item 1' })(mockDispatch);
    const saveItemAction = setItem(
      {
        name: 'Item 1',
      },
      {
        status: 'REQUESTED',
      },
      false,
    );
    expect(mockDispatch.mock.calls[0][0]).toEqual(saveItemAction);
  });

  it('should set the "SUCCESS" status when making a POST request', async () => {
    const mockDispatch = jest.fn();
    postItemRequest.mockReturnValue(Promise.resolve({ id: 123 }));
    await saveItem('users', { name: 'Item 1' })(mockDispatch);
    const saveItemAction = setItem(
      { id: 123 },
      {
        status: 'SUCCESS',
      },
      false,
    );
    expect(mockDispatch.mock.calls[1][0]).toEqual(saveItemAction);
  });

  it('should set the "SUCCESS" status when making a PUT request', async () => {
    const mockDispatch = jest.fn();
    putItemRequest.mockReturnValue(Promise.resolve({ id: 1234 }));
    await saveItem('users', { id: 1234, name: 'Item 1' })(mockDispatch);
    const saveItemAction = setItem(
      { id: 1234 },
      {
        status: 'SUCCESS',
      },
      false,
    );
    expect(mockDispatch.mock.calls[1][0]).toEqual(saveItemAction);
  });


  it('should set the "FAILURE" status', async () => {
    const mockDispatch = jest.fn();
    const anError = new Error('An API error');
    postItemRequest.mockImplementation(() => {
      throw anError;
    });
    await saveItem('users', { name: 'Item 1' })(mockDispatch);
    const setItemAction = setItem(
      anError,
      {
        status: 'FAILURE',
      },
      true,
    );
    expect(mockDispatch.mock.calls[1][0]).toEqual(setItemAction);
  });
});
