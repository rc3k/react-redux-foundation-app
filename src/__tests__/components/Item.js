import React from 'react';
import renderer from 'react-test-renderer';

import { BrowserRouter as Router } from 'react-router-dom';
import { Item } from '../../components/Item';

it('renders correctly when data is loading', () => {
  const item = renderer.create(
    <Router>
      <Item
        meta={{
          status: 'REQUESTED',
        }}
        match={{
          params: {
            collection: 'users',
            itemid: 123,
          },
        }}
        loadItem={() => {
        }}
      />
    </Router>,
  ).toJSON();
  expect(item).toMatchSnapshot();
});

it('renders correctly when an item has loaded', () => {
  const item = renderer.create(
    <Router>
      <Item
        fields={{
          id: 123,
          name: 'An item',
        }}
        meta={{
          status: 'SUCCESS',
        }}
        match={{
          params: {
            collection: 'users',
            itemid: 123,
          },
        }}
        loadItem={() => {
        }}
      />
    </Router>,
  ).toJSON();
  expect(item).toMatchSnapshot();
});
