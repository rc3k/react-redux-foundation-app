import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/collection';

export class Collection extends React.Component {
  componentDidMount() {
    const { match, loadCollection } = this.props;
    loadCollection(match.params.collection);
  }

  render() {
    const {
      items, meta, match, deleteItemFromCollection,
    } = this.props;

    if (meta.status === 'REQUESTED') {
      return (
        <div className="loader">Loading...</div>
      )
    }

    return (
      <div className="collection">
        <h1>{meta.collectionName}</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link to={`/${meta.collectionName}/${item.id}`}>{item.name}</Link>
                </td>
                <td>
                  <input
                    type="button"
                    onClick={() => deleteItemFromCollection(match.params.collection, item.id)}
                    value="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={`/${meta.collectionName}/item/add`}>Add item</Link>
      </div>
    );
  }
}

export const CollectionContainer = withRouter(
  connect((state, ownProps) => ({
    items: state[ownProps.match.params.collection].items,
    meta: state[ownProps.match.params.collection].meta,
  }), actions)(Collection),
);
