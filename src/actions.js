export const actionTypes = {
  CREATE_TODO: 'CREATE_TODO',
  CREATE_TODO_SUCCESS: 'CREATE_TODO_SUCCESS',
  FETCH_TODOS_SUCCESS: 'FETCH_TODOS_SUCCESS',
  DELETE_TODO: 'DELETE_TODO',
  DELETE_TODO_SUCCESS: 'DELETE_TODO_SUCCESS'
};

import fetch from 'isomorphic-fetch';
import uid from 'uid';

const apiUrl = process.env.API_URL;

console.log(apiUrl);

export function createTodo(todo) {
  return async (dispatch) => {
    try {
      todo.uid = uid(10);
      dispatch({
        type: actionTypes.CREATE_TODO,
        payload: {todo}
      });


      const result = await fetch(`${apiUrl}/todos`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: todo.name
        })
      });
      const createdTodo = await result.json();

      dispatch({
        type: actionTypes.CREATE_TODO_SUCCESS,
        payload: {
          uid: todo.uid,
          todo: createdTodo
        }
      });

    } catch (err) {
      console.log(err);
    }
  };
}

export function fetchTodos() {
  return async dispatch => {
    try {
      const result = await fetch(`${apiUrl}/todos`);
      const body = await result.json();

      dispatch({
        type: actionTypes.FETCH_TODOS_SUCCESS,
        payload: body
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export function deleteTodo(todo) {
  return async dispatch => {
    try {
      dispatch({
        type: actionTypes.DELETE_TODO,
        payload: {
          todo
        }
      });
      // Already on server
      if (todo.get('id')) {
        const result = await fetch(`${apiUrl}/todos/${todo.get('id')}`, {
          method: 'delete'
        })

        dispatch({
          type: actionTypes.DELETE_TODO_SUCCESS,
          payload: {todo}
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
