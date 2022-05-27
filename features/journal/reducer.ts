import { createReducer } from "@reduxjs/toolkit";
import {
  addDay,
  addReminderForDay,
  removeDay,
  removeReminderForDay,
} from "./actions";

import { Store, JournalDay, TodosPerDay } from ".";

const now = new Date().toDateString();

function createTodo(msg: string) {
  return { isDone: false, title: msg };
}

const initialState: Store = {
  days: [{ date: now, lastModifiedDate: now }],
  todosPerDay: [{ date: now, todos: [createTodo("test")] }],
};

export const journalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addDay, (state, action) => {
      const day: JournalDay = {
        date: action.payload,
        lastModifiedDate: action.payload,
      };
      state.days.push(day);
    })
    .addCase(removeDay, (state, action) => {
      const indexOfDateToDelete = state.days.findIndex(
        (eachDay: JournalDay) => eachDay.date === action.payload
      );
      state.days = [...state.days.splice(indexOfDateToDelete, 1)];
    })
    .addCase(addReminderForDay, (state, action) => {
      const matchingId = state.todosPerDay.findIndex(
        (todo: TodosPerDay) => todo.date === action.payload.dayId
      );
      state.todosPerDay[matchingId].todos.push(
        createTodo(action.payload.description)
      );
    })
    .addCase(removeReminderForDay, (state, action) => {
      const matchingDayId = state.todosPerDay.findIndex(
        (todo: TodosPerDay) => todo.date === action.payload.dayId
      );
      state.todosPerDay[matchingDayId].todos.splice(
        action.payload.reminderIndex,
        1
      );
    });
});
