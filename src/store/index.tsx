import React, { useState } from 'react';

export interface IToDo {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Store {
  todos: IToDo[];
  createNewTodo: (title: IToDo['title']) => IToDo;
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
  const [todos, setTodos] = useState<IToDo[]>([]);

  const createNewTodo = (title: IToDo['title']) => {
    const newTodo = { id: String(Date.now()), title, isCompleted: false };

    setTodos([...todos, newTodo]);

    return newTodo;
  };

  const store: Store = { todos, createNewTodo };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
