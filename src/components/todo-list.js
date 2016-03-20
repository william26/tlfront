import React, {Component} from 'react';

export default class TodoList extends Component {
  render() {
    const {todos} = this.props;

    let todosDiv = todos
      .toArray()
      .map((todo, index) => {
        let todoClass = 'todo';

        if (todo.get('temporary')) {
          todoClass = 'todo--temp';
        }

        if (todo.get('deletion')) {
          todoClass = 'todo--deleted';
        }
        let actions = (<span></span>);

        let buttonClass = 'todo__delete-button';
        const isButtonDisabled = todo.get('deletion') || todo.get('temporary');
        if (isButtonDisabled) {
          buttonClass = 'todo__delete-button--disabled';
        }

        return (
          <div key={index} className={todoClass}>
            <span className='todo__name'>{todo.get('name')}</span>
            <button
             disabled={isButtonDisabled}
             className={buttonClass}
             onClick={() => this.props.onDeleteTodo(todo)}>
              Delete
            </button>
          </div>
        )
      });
    if (todos.size === 0) {
      todosDiv = (<span className='todo-list__no-todo'>You're free !</span>)
    }
    return (
      <div className='todo-list'>
        {todosDiv}
      </div>
    );
  }
}
