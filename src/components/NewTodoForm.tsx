import React, { useContext, useRef } from 'react';
import { StoreContext } from '../store';

function NewTodoForm(): React.ReactElement {
  const { createNewToDo } = useContext(StoreContext);
  const newTodoInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();

    const title = newTodoInputRef.current?.value;

    // Make sure we actually have something before we create a new todo
    if (!title) return;

    createNewToDo(title);
  };

  return (
    <form onSubmit={handleSubmit} className='flex space-x-2'>
      <label
        htmlFor='new-todo'
        aria-label='Create New To Do'
        className='hidden'
      >
        Create New Todo
      </label>
      <input
        className='flex-grow ml-0 px-4 py-2 text-sm text-blue-600 font-semibold rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2'
        type='text'
        id='new-todo'
        ref={newTodoInputRef}
        placeholder='Get Milk...'
      />

      <button
        type='submit'
        className='px-4 py-2 text-sm text-blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2'
      >
        Add To Do
      </button>
    </form>
  );
}
export default NewTodoForm;
