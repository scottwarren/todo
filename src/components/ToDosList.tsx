import React, { useContext } from 'react';

import ToDo from './ToDo';
import { StoreContext } from '../store';

function ToDosList(): React.ReactElement {
  const { todos } = useContext(StoreContext);

  const title =
    todos?.length > 0
      ? "What's left:"
      : "Add what you've been putting off above";

  // "overflow-y-scroll" allows for the list to be longer than the page. The user will be able to scroll through the todos
  return (
    <div className='overflow-y-scroll'>
      <h2 className='text-l mt-3'>{title}</h2>

      {todos.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}
    </div>
  );
}

export default ToDosList;
