import { createAction, combineActions } from '../../actions/lib';

describe('createAction', () => {
  it('creates an action creator', () => {
    const anActionCreator = createAction('AN_ACTION');
    expect(anActionCreator).toEqual(expect.any(Function));
    expect(anActionCreator({})).toEqual({
      type: 'AN_ACTION',
      payload: {},
      error: false,
      meta: {},
    });
    const error = new Error();
    expect(anActionCreator(error, {}, true)).toEqual({
      type: 'AN_ACTION',
      payload: error,
      error: true,
      meta: {},
    });
  });
});

describe('combineActions', () => {
  it('combines action creators', () => {
    const actionOne = (payload, error) => ({
      type: 'ACTION_ONE',
      payload,
      error,
    });
    const actionTwo = (payload, error) => ({
      type: 'ACTION_TWO',
      payload,
      error,
    });
    const actionThree = (payload, error) => ({
      type: 'ACTION_THREE',
      payload,
      error,
    });
    expect(combineActions({ actionOne, actionTwo }, { actionThree })).toEqual(
      { actionOne, actionTwo, actionThree },
    )
  });
});
