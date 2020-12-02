import Dexie from 'dexie';

import { IToDo } from './';

export class ToDoDatabase extends Dexie {
  todos: Dexie.Table<IToDo, string>;

  constructor(databaseName: string) {
    super(databaseName);
    this.version(1).stores({
      todos: '&++id,title,isCompleted',
    });

    // Just informing Typescript what Dexie has already done
    this.todos = this.table('todos');
  }
}
