import actions from '../../actions/index';

it('includes all actions', () => {
  expect(actions).toMatchObject(
    {
      setCollection: expect.any(Function),
      addItem: expect.any(Function),
      updateItem: expect.any(Function),
      removeItem: expect.any(Function),
    },
  );
});

it('includes all action constants', () => {
  expect(actions).toMatchObject(
    {
      SET_COLLECTION: 'SET_COLLECTION',
      ADD_ITEM: 'ADD_ITEM',
      UPDATE_ITEM: 'UPDATE_ITEM',
      REMOVE_ITEM: 'REMOVE_ITEM',
    },
  );
});
