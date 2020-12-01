import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

export interface IToDo {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Store {
  todos: IToDo[];
  createNewTodo: (title: IToDo['title']) => IToDo;
  deleteToDo: (id: IToDo['id']) => void;
}

interface StoreProviderProps {
  children?: React.ReactNode;
}

const generateNewTodo = (title: IToDo['title']) => ({
  id: uuidv4(),
  title,
  isCompleted: false,
});

const defaultStore: Store = {
  todos: [],
  createNewTodo: generateNewTodo,
  deleteToDo: () => {
    console.info(
      'Using default store. Make sure to wrap the application in a provider'
    );
  },
};

export const StoreContext = React.createContext(defaultStore);

export const StoreProvider = ({
  children,
}: StoreProviderProps): React.ReactElement => {
  // TODO: Extract to service and integrate with IndexedDB library
  const [todos, setTodos] = useState<IToDo[]>([]);

  const createNewTodo = (title: IToDo['title']) => {
    const newTodo = generateNewTodo(title);

    setTodos([...todos, newTodo]);

    return newTodo;
  };

  const deleteToDo = (id: IToDo['id']) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);

    setTodos(filteredTodos);
  };

  const store: Store = { todos, createNewTodo, deleteToDo };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
