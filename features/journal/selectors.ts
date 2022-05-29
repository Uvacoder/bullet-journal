import { RootState } from "../../src/store";
import { JOURNAL_SLICE_KEY } from ".";
import type { DateString } from ".";

export const selectSliceState = (state: RootState) => state[JOURNAL_SLICE_KEY];
export const selectDays = (state: RootState) => state[JOURNAL_SLICE_KEY].days;
export const selectTodosDays = (state: RootState) =>
  state[JOURNAL_SLICE_KEY].todosPerDay;
export const selectTodosForDay = (state: RootState, day: DateString) =>
  state[JOURNAL_SLICE_KEY].todosPerDay.find((item) => item.date === day);

export const selectUnfinishedTodos = (state: RootState, day: DateString) =>
  state[JOURNAL_SLICE_KEY].todosPerDay
    .find((item) => item.date === day)
    ?.todos.filter((todo) => todo.isDone !== true);

export const selectDaysInStore = (state: RootState) =>
  state[JOURNAL_SLICE_KEY].todosPerDay.map((item) => item.date);
