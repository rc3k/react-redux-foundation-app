const ASYNC_TIMEOUT = 1000;

const payloadData = {
  example: [
    {
      id: 1,
      name: 'Item 1',
    },
    {
      id: 2,
      name: 'Item 2',
    },
    {
      id: 3,
      name: 'Item 3',
    },
  ],
};

export const loadCollectionRequest = (collectionName) => new Promise((resolve) => {
  setTimeout(() => resolve(payloadData[collectionName]), ASYNC_TIMEOUT)
});

export const loadItemRequest = (collectionName, itemId) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(payloadData[collectionName].find((item) => item.id === itemId));
  }, ASYNC_TIMEOUT);
});

export const putItemRequest = (collectionName, item) => new Promise((resolve) => {
  setTimeout(() => {
    payloadData[collectionName] = payloadData[collectionName].map(
      (storedItem) => (storedItem.id === item.id ? item : storedItem),
    );
    resolve(payloadData[collectionName].find((storedItem) => item.id === storedItem.id));
  }, ASYNC_TIMEOUT)
});

export const postItemRequest = (collectionName, item) => new Promise((resolve) => {
  setTimeout(() => {
    const newItem = Object.assign(item);
    newItem.id = payloadData[collectionName].length + 1;
    payloadData[collectionName] = payloadData[collectionName].concat([newItem]);
    resolve(newItem);
  }, ASYNC_TIMEOUT)
});

export const deleteItemRequest = (collectionName, itemId) => new Promise((resolve) => {
  setTimeout(() => {
    payloadData[collectionName] = payloadData[collectionName].filter(
      (storedItem) => storedItem.id !== itemId,
    );
    resolve(itemId);
  }, ASYNC_TIMEOUT)
});
