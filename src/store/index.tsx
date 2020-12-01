import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface IToDo {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Store {
  todos: IToDo[];
  createNewToDo: (title: IToDo['title']) => IToDo;
  deleteToDo: (id: IToDo['id']) => void;
  completeToDo: (id: IToDo['id']) => void;
}

interface StoreProviderProps {
  children?: React.ReactNode;
}

const generateNewTodo = (title: IToDo['title']) => ({
  id: uuidv4(),
  title,
  isCompleted: false,
});

const defaultStoreMessage =
  'Using default store. Make sure to wrap the application in a provider';

const defaultStore: Store = {
  todos: [],
  createNewToDo: (title) => {
    console.info(defaultStoreMessage);

    return generateNewTodo(title);
  },
  deleteToDo: () => {
    console.info(defaultStoreMessage);
  },
  completeToDo: () => {
    console.info(defaultStoreMessage);
  },
};

export const StoreContext = React.createContext(defaultStore);

export const StoreProvider = ({
  children,
}: StoreProviderProps): React.ReactElement => {
  // TODO: Extract to service and integrate with IndexedDB library
  const [todos, setTodos] = useState<IToDo[]>([]);

  const store: Store = {
    todos,
    createNewToDo: (title: IToDo['title']) => {
      const newTodo = generateNewTodo(title);

      setTodos([...todos, newTodo]);

      return newTodo;
    },
    deleteToDo: (id: IToDo['id']) => {
      const filteredTodos = todos.filter((todo) => todo.id !== id);

      setTodos(filteredTodos);
    },
    completeToDo: (id) => {
      const todoIndex = todos.findIndex((todo) => todo.id === id);
      const todo = todos[todoIndex];

      const newTodos = [...todos];

      todo.isCompleted = !todo.isCompleted;

      setTodos(newTodos);
    },
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
