import React, { memo, useCallback } from "react";
import { observer } from "mobx-react";
import { TodoContainer } from "./TodoComponent";
import { SortDirection } from "../stores/list.store";
import { useStore } from "../stores/mobx.context";
import { NewTodoComponent } from "./NewTodoComponent";

// ----------- container --------

export const TodoListContainer: React.FC<{}> = observer(() => {
  const { listStore } = useStore();
  const {
    todoIdsList,
    addTodo,
    sortByName,
    sortDirection,
    onlyDoneIsShown,
    setShowOnlyDone,
  } = listStore;

  return (
    <TodoListComponent
      todoIdsList={todoIdsList}
      addTodo={addTodo}
      sortByName={sortByName}
      sortDirection={sortDirection}
      onlyDoneIsShown={onlyDoneIsShown}
      showOnlyDone={setShowOnlyDone}
    />
  );
});

// ----------- component --------


interface Props {
  todoIdsList: string[];
  addTodo: (name: string, description: string) => void;
  sortByName: (sortDirection: SortDirection) => void;
  sortDirection: SortDirection;
  onlyDoneIsShown: boolean;
  showOnlyDone: (flag: boolean) => void;
}

const TodoListComponent: React.FC<Props> = memo(
  ({
    addTodo,
    todoIdsList,
    sortByName,
    sortDirection,
    onlyDoneIsShown,
    showOnlyDone,
  }) => {
    const sort = useCallback(() => {
      const newSortDirection =
        sortDirection !== SortDirection.ASC
          ? SortDirection.ASC
          : SortDirection.DESC;
      sortByName(newSortDirection);
    }, [sortDirection, sortByName]);

    const setShowOnlyDone = useCallback(() => {
      showOnlyDone(!onlyDoneIsShown);
    }, [showOnlyDone, onlyDoneIsShown]);

    return (
      <div className="main">
        <h2>Todo List</h2>

        <div className="filter-container">
          Show only done
          <input
            className="checkbox"
            type="checkbox"
            onChange={setShowOnlyDone}
            checked={onlyDoneIsShown}
          />
        </div>

        <div className="sort-container">
          <div className="sorted-label">Sorted by name: {sortDirection}</div>
          <button className="sort-btn" onClick={sort}>
            SORT
          </button>
        </div>

        <div className="list">
          {todoIdsList.map((id) => (
            <TodoContainer id={id} key={id} />
          ))}
        </div>
        <NewTodoComponent addTodo={addTodo} />
      </div>
    );
  }
);



