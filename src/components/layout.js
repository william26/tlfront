import React, {Component} from 'react';

import {connect} from 'react-redux';

import TodoList from './todo-list';
import TodoInput from './todo-input';

import {createTodo, fetchTodos, deleteTodo} from '../actions';

class LayoutComponent extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTodos());
  }

  addTodo(name) {
    this.props.dispatch(createTodo({name}));
  }

  deleteTodo(todo) {
    this.props.dispatch(deleteTodo(todo));
  }


  render() {
    const {todos} = this.props;
    return (
      <div className='todo-container'>
        <TodoInput onAddTodo={(name) => this.addTodo(name)} />
        <TodoList todos={todos} onDeleteTodo={todo => this.deleteTodo(todo)} />
      </div>
    );
  }
}

function selectFromState(state) {
  return {
    todos: state.todos
  }
}

export default connect(selectFromState)(LayoutComponent);
