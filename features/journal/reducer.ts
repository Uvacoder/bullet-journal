import { createReducer } from "@reduxjs/toolkit";
import {
  addDay,
  addReminderForDay,
  removeDay,
  removeReminderForDay,
  toggleReminderDone,
} from "./actions";

import dayjs from "dayjs";

import { Store, JournalDay, TodosPerDay } from ".";
import { DATE_FORMAT_SORTABLE } from "../../src/magicValues";

const now = dayjs().format(DATE_FORMAT_SORTABLE);

function createTodo(title: string, isDone: boolean = false) {
  return { isDone, title };
}

// const initialState: Store = {
//   days: [{ date: now, lastModifiedDate: now }],
//   todosPerDay: [
//     {
//       date: now,
//       todos: [createTodo("test"), createTodo("automatically done", true)],
//     },
//   ],
// };

const initialState: Store = {
  days: [],
  todosPerDay: [],
};

export const journalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addDay, (state, action) => {
      const formattedDate = dayjs(action.payload).format(DATE_FORMAT_SORTABLE);
      const day: JournalDay = {
        date: formattedDate,
        lastModifiedDate: formattedDate,
      };
      state.days.push(day);
      state.todosPerDay.push({ date: formattedDate, todos: [] });
    })
    .addCase(removeDay, (state, action) => {
      const indexOfDateToDelete = state.days.findIndex(
        (eachDay: JournalDay) => eachDay.date === action.payload
      );
      const indexOfTodosToDelete = state.todosPerDay.findIndex(
        (eachDay) => eachDay.date === action.payload
      );

      console.log(indexOfDateToDelete, indexOfTodosToDelete);
      state.days.splice(indexOfDateToDelete, 1);
      state.todosPerDay.splice(indexOfTodosToDelete, 1);
    })
    .addCase(addReminderForDay, (state, action) => {
      const matchingId = state.todosPerDay.findIndex(
        (todo: TodosPerDay) => todo.date === action.payload.dayId
      );
      state.todosPerDay[matchingId].todos.push(
        createTodo(action.payload.description, false)
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
    })
    .addCase(toggleReminderDone, (state, action) => {
      const matchingDayId = state.todosPerDay.findIndex(
        (todo: TodosPerDay) => todo.date === action.payload.dayId
      );
      const isDone =
        state.todosPerDay[matchingDayId].todos[action.payload.reminderIndex]
          .isDone;
      state.todosPerDay[matchingDayId].todos[
        action.payload.reminderIndex
      ].isDone = !isDone;
    });
});
