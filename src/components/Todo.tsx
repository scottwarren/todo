import React, { useContext } from 'react';
import { BiTrash } from 'react-icons/bi';
import cn from 'classnames';

import { IToDo, StoreContext } from '../store';

function Todo({ id, title, isCompleted }: IToDo): React.ReactElement {
  const { deleteToDo, completeToDo } = useContext(StoreContext);

  const titleClasses = cn({
    'line-through': isCompleted,
    'justify-self-stretch': true,
    'flex-1': true,
    'mt-1': true,
    'mb-1': true,
  });

  return (
    <div className='flex justify-items-start items-center p-1 gap-3'>
      <div className='align-middle'>
        <label className='inline-flex items-center mt-3'>
          <input
            type='checkbox'
            className='form-checkbox h-5 w-5 text-gray-600'
            checked={isCompleted}
            onChange={completeToDo.bind(null, id)}
          />
          <span className='ml-2 text-gray-700 hidden'>Complete ToDo</span>
        </label>
      </div>
      <div className={titleClasses}>{title}</div>
      <button
        className='fill-current text-blue-600 hover:text-blue-800 text-xl'
        title='Delete To Do'
        onClick={deleteToDo.bind(null, id)}
      >
        <BiTrash />
      </button>
    </div>
  );
}
export default Todo;
