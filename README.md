# React Redux Foundation App

A React/Redux app that acts as a starting point for more complex development.

## Use
This is suitable for apps that:

* consume a RESTful web service,
* require an interface for CRUD operations, such as the administration of backend data models.

## Purposes

1) To speed up the initial stages of development.
2) To [reduce boilerplate](https://redux.js.org/recipes/reducing-boilerplate), particularly in regard to the creation of action creators. 

## Actions and State

### Compliance with [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action).

All actions have the same shape:

```javascript
{
  type: 'MY_ACTION', 
  payload: {}, // the payload of the action
  error: false, // a boolean value (if true, then payload will be an error object)
  meta: {} // data about the action that's not part part of the payload itself
}
```

### Actions and State

Actions and State are divided into 2 slices: "Collection" and "Item":
 
 * The collection slice provides actions and state to be used in list views (e.g. a view that displays a table of objects retrieved from the backend API).
 * The item slice provides actions and state to be used in creating, updating, deleting and rendering individual objects.
 