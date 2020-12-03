import React, { useContext, useRef } from 'react';
import { StoreContext } from '../store';

function NewToDoForm(): React.ReactElement {
  const { createNewToDo } = useContext(StoreContext);
  const newToDoInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();

    const title = newToDoInputRef.current?.value;

    // Make sure we actually have a todo to add before we create a new todo in the store
    // pseudo-validation
    if (!title) return;

    createNewToDo(title);

    if (newToDoInputRef?.current) {
      // Reset the form so the user can enter a new todo
      newToDoInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex space-x-2'>
      <label
        htmlFor='new-todo'
        aria-label='Create New To Do'
        className='hidden'
      >
        Create New ToDo
      </label>
      <input
        className='flex-grow ml-0 px-4 py-2 text-sm text-blue-600 font-semibold rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2'
        type='text'
        id='new-todo'
        ref={newToDoInputRef}
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
export default NewToDoForm;
