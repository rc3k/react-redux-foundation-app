export const updateObject = (oldObject, newValues) => ({ ...oldObject, ...newValues });

export const addItemToArray = (oldArray, newItem) => oldArray.concat(newItem);

export const removeItemFromArray = (
  oldArray, key, value,
) => oldArray.filter((item) => item[key] !== value);

export const updateItemInArray = (oldArray, key, item) => oldArray.map(
  (oldItem) => (oldItem[key] === item[key] ? ({ ...item }) : oldItem),
);

export const reduceReducers = (...reducers) => (prevState, value, ...args) => reducers.reduce(
  (newState, reducer) => reducer(newState, value, ...args),
  prevState,
);
