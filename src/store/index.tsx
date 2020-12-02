import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ToDoDatabase } from './database';

export interface IToDo {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Store {
  todos: IToDo[];
  createNewToDo: (title: IToDo['title']) => Promise<IToDo>;
  deleteToDo: (id: IToDo['id']) => Promise<void>;
  completeToDo: (id: IToDo['id']) => Promise<void>;
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
  createNewToDo: async (title) => {
    console.info(defaultStoreMessage);

    return generateNewTodo(title);
  },
  deleteToDo: async () => {
    console.info(defaultStoreMessage);
  },
  completeToDo: async () => {
    console.info(defaultStoreMessage);
  },
};

export const StoreContext = React.createContext(defaultStore);

const db = new ToDoDatabase('todoDatabase');

export const StoreProvider = ({
  children,
}: StoreProviderProps): React.ReactElement => {
  const [todos, setToDos] = useState<IToDo[]>([]);

  useEffect(() => {
    db.open().catch((err: Error) => {
      console.error(`Open failed: ${err.stack}`);
    });

    async function fetchAllToDos() {
      setToDos(await db.todos.toArray());
    }

    fetchAllToDos();

    // Close the connection to the database when this component is unmounted
    return () => {
      db.close();
    };
  }, []);

  async function syncToDosWithDb() {
    setToDos(await db.todos.toArray());
  }

  const store: Store = {
    todos,
    createNewToDo: async (title: IToDo['title']) => {
      const newTodo = generateNewTodo(title);
      await db.todos.add(newTodo);

      syncToDosWithDb();

      return newTodo;
    },
    deleteToDo: async (id: IToDo['id']) => {
      db.todos.delete(id);

      syncToDosWithDb();
    },
    completeToDo: async (id) => {
      const todoToUpdate = await db.todos.get(id);

      if (todoToUpdate) {
        db.todos.update(id, { isCompleted: !todoToUpdate.isCompleted });
        setToDos(await db.todos.toArray());
      }
      syncToDosWithDb();
    },
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
