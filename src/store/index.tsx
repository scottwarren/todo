import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { db } from './database';

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

const generateNewToDo = (title: IToDo['title']) => ({
  id: uuidv4(),
  title,
  isCompleted: false,
  createdAt: Date.now(),
});

const defaultStoreMessage =
  'Using default store. Make sure to wrap the application in a provider';

const defaultStore: Store = {
  todos: [],
  createNewToDo: async (title) => {
    console.info(defaultStoreMessage);

    return generateNewToDo(title);
  },
  deleteToDo: async () => {
    console.info(defaultStoreMessage);
  },
  completeToDo: async () => {
    console.info(defaultStoreMessage);
  },
};

export const StoreContext = React.createContext(defaultStore);

export const StoreProvider = ({
  children,
}: StoreProviderProps): React.ReactElement => {
  const [todos, setToDos] = useState<IToDo[]>([]);

  async function syncToDosWithDb() {
    // Get the todos from the DB sorted by the latest first
    const latestTodos = await db.todos.orderBy('createdAt').reverse().toArray();

    // Sync what we received with our store state
    setToDos(latestTodos);
  }

  useEffect(() => {
    db.open().catch((err: Error) => {
      console.error(`Open failed: ${err.stack}`);
    });

    // Initial fetch from the database
    syncToDosWithDb();

    // Close the connection to the database when this component is unmounted
    return () => {
      db.close();
    };
  }, []);

  const store: Store = {
    todos,
    createNewToDo: async (title: IToDo['title']) => {
      const newToDo = generateNewToDo(title);
      await db.todos.add(newToDo);

      syncToDosWithDb();

      return newToDo;
    },
    deleteToDo: async (id: IToDo['id']) => {
      db.todos.delete(id);

      syncToDosWithDb();
    },
    completeToDo: async (id) => {
      const todoToUpdate = await db.todos.get(id);

      if (todoToUpdate) {
        db.todos.update(id, { isCompleted: !todoToUpdate.isCompleted });
        syncToDosWithDb();
      }
    },
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
