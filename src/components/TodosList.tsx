import React, { useContext } from 'react';

import ToDo from './Todo';
import { StoreContext } from '../store';

function TodosList(): React.ReactElement {
  const { todos } = useContext(StoreContext);

  const title =
    todos?.length > 0
      ? "What's left:"
      : "Add what you've been putting off above";

  return (
    <div>
      <h2 className='text-xl mt-3'>{title}</h2>

      {todos.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}
    </div>
  );
}

export default TodosList;
