import React, { useContext, useRef } from 'react';
import { StoreContext } from '../store';

function NewTodoForm(): React.ReactElement {
  const { createNewTodo } = useContext(StoreContext);
  const newTodoInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();

    const title = newTodoInputRef.current?.value;

    // Make sure we actually have something before we create a new todo
    if (!title) return;

    createNewTodo(title);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='new-todo'>Create New Todo</label>
        <input id='new-todo' ref={newTodoInputRef} />
        <input type='submit' />
      </form>
    </div>
  );
}
export default NewTodoForm;
