import React, {Component} from 'react';

export default class TodoInput extends Component {
  render() {
    return (
      <form action="javascript:void(0);" className='todo-inputs'>
        <div className='todo-inputs__input'>
          <input type='text' ref='todoName' placeholder='Enter a task here...' />
        </div>
        <button className='todo-inputs__button' onClick={() => this.addTodo()}>Add !</button>
      </form>
    );
  }
  addTodo() {
    const input = this.refs.todoName;
    this.props.onAddTodo(input.value);
    input.value = '';
  }
}
