import React, { useContext } from 'react';
import styled from 'styled-components';

import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import { StoreContext } from '../store';

const Container = styled.div`
  max-height: 80vw;
  width: 60vw;
`;

const Title = styled.h2``;

function Todos(): React.ReactElement {
  const { todos } = useContext(StoreContext);

  return (
    <Container>
      <Title>Todo App</Title>
      <NewTodoForm />
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </Container>
  );
}

export default Todos;
