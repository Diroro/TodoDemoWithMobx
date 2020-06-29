import React, { useCallback } from "react";
import { observer } from "mobx-react";
import { useStore } from "../stores/mobx.context";
import { Todo } from "../stores/list.store";

// ----------- container --------

interface TodoContainerProps {
  id: string;
}

export const TodoContainer: React.FC<TodoContainerProps> = observer((props) => {
  const { listStore } = useStore();
  const { setIsDone, deleteTodo, todoMap } = listStore;
  const todo = todoMap.get(props.id);

  if (!todo) {
    return null;
  }

  return (
    <TodoComponent todo={todo} setIsDone={setIsDone} deleteTodo={deleteTodo} />
  );
});

// ----------- component --------

interface Props {
  todo: Todo;
  setIsDone: (id: string, flag: boolean) => void;
  deleteTodo: (id: string) => void;
}

export const TodoComponent: React.FC<Props> = (props) => {
  const { todo, setIsDone, deleteTodo } = props;
  const { id, description, name, isDone } = todo;

  const removeTodo = useCallback(() => deleteTodo(id), [deleteTodo, id]);
  const setDone = useCallback(() => setIsDone(id, !isDone), [
    id,
    isDone,
    setIsDone,
  ]);

  return (
    <div className="item">
      <div className="text">{name}</div>
      <div className="text">{description}</div>
      <div className="checkbox-wrapper">
        <input
          className="checkbox"
          type="checkbox"
          onChange={setDone}
          checked={isDone}
        />{" "}
        Is Done
      </div>
      <button className="delete-btn" onClick={removeTodo}>
        DELETE
      </button>
    </div>
  );
};
