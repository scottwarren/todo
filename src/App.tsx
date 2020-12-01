import React from 'react';
import styled from 'styled-components';

import { StoreProvider } from './store';
import Todos from './components/Todos';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vw;
  width: 100vw;
`;

function App(): React.ReactElement {
  return (
    <Container>
      <StoreProvider>
        <Todos />
      </StoreProvider>
    </Container>
  );
}

export default App;
