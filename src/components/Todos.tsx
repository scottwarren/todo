import React, { useContext } from 'react';

import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import { StoreContext } from '../store';

function Todos(): React.ReactElement {
  const { todos } = useContext(StoreContext);

  return (
    <div className='flex flex-1 flex-col max-w-screen-lg p-6 bg-white rounded-xl shadow-md  '>
      <h2 className='text-xl mb-3'>Todo App</h2>
      <NewTodoForm />
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
}

export default Todos;
