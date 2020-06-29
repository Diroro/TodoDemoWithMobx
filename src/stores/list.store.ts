import { observable, computed, action, autorun, reaction } from "mobx";
import { nanoid } from "nanoid";

export interface Todo {
  id: string;
  name: string;
  description: string;
  isDone: boolean;
}

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

const isDefined = <T>(value: T | undefined): value is T => value !== undefined;

export class ListStore {
  @observable
  todoMap: Map<string, Todo> = new Map();

  @observable
  sortDirection: SortDirection = SortDirection.ASC;

  @observable
  onlyDoneIsShown: boolean = false;

  constructor() {
    autorun(() => console.log("AUTORUN"));

    reaction(
      () => this.sortDirection,
      (sd) => console.log("SORT DIRECTION CHANGED: ", sd)
    );
  }

  @computed
  get sortedTtodoIdsList(): string[] {
    const todoList: Todo[] = [];

    this.todoMap.forEach((value) => {
      todoList.push(value);
    });

    const sortDirection = this.sortDirection;

    todoList.sort((a, b) => {
      if (sortDirection === SortDirection.ASC) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      } else {
        return b.name < a.name ? -1 : b.name > a.name ? 1 : 0;
      }
    });

    return todoList.map((item) => item.id);
  }

  @computed
  get doneTodoList() {
    return this.sortedTtodoIdsList
      .map((id) => this.todoMap.get(id))
      .filter(isDefined)
      .filter((todo) => todo.isDone)
      .map((todo) => todo.id);
  }

  @computed.struct
  get todoIdsList(): string[] {
    return this.onlyDoneIsShown ? this.doneTodoList : this.sortedTtodoIdsList;
  }

  @action
  addTodo = (name: string, description: string) => {
    const data = {
      id: nanoid(),
      name,
      description,
      isDone: false,
    };

    this.todoMap.set(data.id, data);
  };

  @action
  deleteTodo = (id: string) => {
    this.todoMap.delete(id);
  };

  @action
  sortByName = (sortDirection: SortDirection) => {
    this.sortDirection = sortDirection;
  };

  @action
  setIsDone = (id: string, flag: boolean) => {
    const todo = this.todoMap.get(id);
    if (!todo) {
      return;
    }

    const newTodo = {
      ...todo,
      isDone: flag,
    };

    this.todoMap.set(id, newTodo);
  };

  @action
  setShowOnlyDone = (flag: boolean) => {
    this.onlyDoneIsShown = flag;
  };
}
