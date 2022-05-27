export const JOURNAL_SLICE_KEY = "journal";
export * from "./actions";
export * from "./reducer";
export * from "./selectors";

export type DateString = string;

export interface JournalDay {
  date: DateString;
  lastModifiedDate: DateString;
}

export interface Todo {
  title: string;
  description?: string;
  isDone: boolean;
}

export interface TodosPerDay {
  date: DateString;
  todos: Todo[];
}

export interface Store {
  todosPerDay: TodosPerDay[];
  days: JournalDay[];
}
