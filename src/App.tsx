import React from 'react';

import { StoreProvider } from './store';

import TodosList from './components/TodosList';
import NewTodoForm from './components/NewTodoForm';

function App(): React.ReactElement {
  return (
    <StoreProvider>
      <div className='flex items-center justify-center bg-gray-100 w-screen h-screen'>
        <div className='flex flex-1 flex-col max-w-screen-lg p-6 bg-white rounded-xl shadow-md  '>
          <h2 className='text-xl mb-3'>What&apos;s left:</h2>
          <NewTodoForm />
          <TodosList />
        </div>
      </div>
    </StoreProvider>
  );
}

export default App;
