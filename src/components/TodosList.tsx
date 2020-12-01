import React, { useContext } from 'react';

import ToDo from './Todo';
import { StoreContext } from '../store';

function TodosList(): React.ReactElement {
  const { todos } = useContext(StoreContext);

  return (
    <>
      {todos.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}
    </>
  );
}

export default TodosList;
