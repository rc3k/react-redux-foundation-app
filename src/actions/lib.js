export const createAction = (type) => (payload, meta, error) => ({
  type,
  payload,
  meta: meta || {},
  error: error || false,
});

export const combineActions = (...actions) => Object.assign(...actions);
