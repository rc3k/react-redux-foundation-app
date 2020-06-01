import reducer from '../../reducers/item';
import { UPDATE_ITEM, UPDATE_ITEM_ATTRIBUTE, SET_ITEM } from '../../actions/item';

describe('item reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      item: {
        fields: {
          name: '',
        },
        meta: {
          status: null,
        },
      },
    });
  });

  it('should handle the UPDATE_ITEM action', () => {
    const oldState = {
      item: {
        fields: {
          id: 1,
          name: 'Item name',
        },
        meta: {},
      },
    };
    const newState = reducer(oldState, {
      type: UPDATE_ITEM,
      payload: {
        name: 'Item renamed',
      },
      meta: {},
    });
    expect(newState).toEqual({
      item: {
        fields: {
          id: 1,
          name: 'Item renamed',
        },
        meta: {},
      },
    });
    expect(oldState).toEqual({
      item: {
        fields: {
          id: 1,
          name: 'Item name',
        },
        meta: {},
      },
    });
  });

  it('should handle the UPDATE_ITEM_ATTRIBUTE action', () => {
    const oldState = {
      item: {
        fields: {
          id: 1,
          name: 'Item name',
        },
        meta: {},
      },
    };
    const newState = reducer(oldState, {
      type: UPDATE_ITEM_ATTRIBUTE,
      payload: {
        attribute: 'name',
        value: 'Item renamed',
      },
      meta: {},
    });
    expect(newState).toEqual({
      item: {
        fields: {
          id: 1,
          name: 'Item renamed',
        },
        meta: {},
      },
    });
    expect(oldState).toEqual({
      item: {
        fields: {
          id: 1,
          name: 'Item name',
        },
        meta: {},
      },
    });
  });

  it('should handle the SET_ITEM action', () => {
    const oldState = {
      item: {
        fields: {
          id: 1,
          name: 'Item name',
        },
        meta: {},
      },
    };
    const newState = reducer(oldState, {
      type: SET_ITEM,
      payload: {
        id: 2,
        name: 'Item renamed',
      },
      meta: {
        status: 'SUCCESS',
      },
    });
    expect(newState).toEqual({
      item: {
        fields: {
          id: 2,
          name: 'Item renamed',
        },
        meta: {
          status: 'SUCCESS',
        },
      },
    });
    expect(oldState).toEqual({
      item: {
        fields: {
          id: 1,
          name: 'Item name',
        },
        meta: {},
      },
    });
  });
});
