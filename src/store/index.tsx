import React, { useState } from 'react';

interface ToDo {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Store {
  todos: ToDo[];
  createNewTodo: (title: ToDo['title']) => ToDo;
}

interface StoreProviderProps {
  children?: React.ReactNode;
}

const defaultStore: Store = {
  todos: [],
  createNewTodo: (title) => ({
    id: String(Date.now()),
    title,
    isCompleted: false,
  }),
};

export const StoreContext = React.createContext(defaultStore);

export const StoreProvider = ({
  children,
}: StoreProviderProps): React.ReactElement => {
  // TODO: Extract to service and integrate with IndexedDB library
  const [todos, setTodos] = useState<ToDo[]>([]);

  const createNewTodo = (title: ToDo['title']) => {
    const newTodo = { id: String(Date.now()), title, isCompleted: false };

    setTodos([...todos, newTodo]);

    return newTodo;
  };

  const store: Store = { todos, createNewTodo };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
