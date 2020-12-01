import React from 'react';

import { StoreProvider } from './store';
import Todos from './components/Todos';

function App(): React.ReactElement {
  return (
    <div className='flex items-center justify-center bg-gray-100 w-screen h-screen'>
      <StoreProvider>
        <Todos />
      </StoreProvider>
    </div>
  );
}

export default App;
