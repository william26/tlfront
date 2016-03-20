import {actionTypes} from './actions';

import immutable from 'immutable';

export function todos(state = new immutable.Map(), action) {
  switch (action.type) {
    case actionTypes.CREATE_TODO:
      action.payload.todo.temporary = true;
      return state.set(action.payload.todo.uid, immutable.fromJS(action.payload.todo));
    case actionTypes.CREATE_TODO_SUCCESS:
      return state
        .delete(action.payload.uid)
        .set(action.payload.todo.id, immutable.fromJS(action.payload.todo));
    case actionTypes.FETCH_TODOS_SUCCESS:
      return action.payload.reduce(function (newState, todo) {
        if (!todo.name) {
          todo.name = 'something'
        }
        return newState.set(todo.id, immutable.fromJS(todo));
      }, state);
    case actionTypes.DELETE_TODO:
      const todo = state.get(action.payload.todo.get('id'));
      return state.set(todo.get('id'), todo.set('deletion', true));
    case actionTypes.DELETE_TODO_SUCCESS:
      return state.delete(action.payload.todo.get('id'));
    default:
      return state;
  }
}
