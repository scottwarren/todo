import React from 'react';

import { IToDo } from '../store';

function Todo({ id, title, isCompleted }: IToDo): React.ReactElement {
  return (
    <div>
      {id} {title} isCompleted: {isCompleted ? 'yes' : 'no'}
    </div>
  );
}
export default Todo;
