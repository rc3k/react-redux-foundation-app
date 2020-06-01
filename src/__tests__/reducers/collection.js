import reducer from '../../reducers/collection';
import { SET_COLLECTION, ADD_ITEM, REMOVE_ITEM } from '../../actions/collection';

describe('collection reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      example: {
        items: [],
        meta: {
          collectionName: 'example',
          key: 'id',
          state: null,
        },
      },
    });
  });

  it('should handle the SET_COLLECTION action', () => {
    const oldState = {
      users: {
        items: [{
          name: 'user nobody',
        }],
        meta: {
          collectionName: 'users',
        },
      },
    };
    const newState = reducer(oldState, {
      type: SET_COLLECTION,
      payload: [{
        name: 'user 1',
      }, {
        name: 'user 2',
      }],
      meta: {
        status: 'SUCCESS',
        collectionName: 'users',
      },
    });
    expect(newState).toEqual({
      users: {
        items: [
          {
            name: 'user 1',
          },
          {
            name: 'user 2',
          },
        ],
        meta: {
          status: 'SUCCESS',
          collectionName: 'users',
        },
      },
    });
    expect(oldState).toEqual({
      users: {
        items: [{
          name: 'user nobody',
        }],
        meta: {
          collectionName: 'users',
        },
      },
    });
  });

  it('should handle the ADD_ITEM action', () => {
    const oldState = {
      users: {
        items: [{
          name: 'user nobody',
        }],
        meta: {
          collectionName: 'users',
        },
      },
    };
    const newState = reducer(oldState, {
      type: ADD_ITEM,
      payload: {
        name: 'user somebody',
      },
      meta: {
        collectionName: 'users',
      },
    });
    expect(newState).toEqual({
      users: {
        items: [
          {
            name: 'user nobody',
          },
          {
            name: 'user somebody',
          },
        ],
        meta: {
          collectionName: 'users',
        },
      },
    });
    expect(oldState).toEqual({
      users: {
        items: [{
          name: 'user nobody',
        }],
        meta: {
          collectionName: 'users',
        },
      },
    });
  });

  it('should handle the REMOVE_ITEM action', () => {
    const oldState = {
      users: {
        items: [
          {
            id: 456,
          },
          {
            id: 123,
          },
          {
            id: 789,
          },
        ],
        meta: {
          key: 'id',
          collectionName: 'users',
        },
      },
    };
    const newState = reducer(oldState, {
      type: REMOVE_ITEM,
      payload: 123,
      meta: {
        collectionName: 'users',
        status: 'SUCCESS',
      },
    });
    expect(newState).toEqual({
      users: {
        items: [
          {
            id: 456,
          },
          {
            id: 789,
          },
        ],
        meta: {
          key: 'id',
          collectionName: 'users',
          status: 'SUCCESS',
        },
      },
    });
    expect(oldState).toEqual({
      users: {
        items: [
          {
            id: 456,
          },
          {
            id: 123,
          },
          {
            id: 789,
          },
        ],
        meta: {
          key: 'id',
          collectionName: 'users',
        },
      },
    });
  });
});
