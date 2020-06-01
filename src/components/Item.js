import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/item';

export class Item extends React.Component {
  componentDidMount() {
    const { loadItem, match } = this.props;
    const { collection, itemid } = match.params;
    if (itemid) {
      loadItem(collection, parseInt(itemid, 10));
    }
  }

  render() {
    const {
      fields, updateItemAttribute, saveItem, history, match, meta,
    } = this.props;
    if (meta.status === 'REQUESTED') {
      return (
        <div className="loader">Loading...</div>
      )
    }
    return (
      <div className="item">
        <h1>{fields.name}</h1>
        <form>
          <input
            type="text"
            value={fields.name}
            onChange={(event) => updateItemAttribute(
              {
                attribute: 'name',
                value: event.target.value,
              },
            )}
          />
          <input type="button" onClick={() => history.push(`/${match.params.collection}`)} value="Cancel" />
          <input
            type="button"
            onClick={() => saveItem(match.params.collection, fields, () => history.push(`/${match.params.collection}`))}
            value="Save"
          />
        </form>
      </div>
    );
  }
}

export const ItemContainer = withRouter(
  connect(
    (state) => ({
      fields: state.item.fields,
      meta: state.item.meta,
    }),
    actions,
  )(Item),
);
