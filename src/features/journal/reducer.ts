import { createReducer } from '@reduxjs/toolkit'
import {
  addDay,
  addDays,
  addReminderForDay,
  removeDay,
  removeReminderForDay,
  toggleReminderDone,
  setNumberOfDaysVisible,
} from './actions'

import dayjs from 'dayjs'

import { Store, JournalDay, TodosPerDay } from '.'
import { DATE_FORMAT_SORTABLE } from '../../utilities/magicValues'

function createTodo(title: string, isDone = false) {
  return { isDone, title }
}

const initialState: Store = {
  days: [],
  todosPerDay: [],
  numberOfDaysVisible: 14,
}

export const journalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addDay, (state, action) => {
      const formattedDate = dayjs(action.payload).format(DATE_FORMAT_SORTABLE)
      const day: JournalDay = {
        date: formattedDate,
        lastModifiedDate: formattedDate,
      }
      state.days.push(day)
      state.todosPerDay.push({ date: formattedDate, todos: [] })
    })
    .addCase(addDays, (state, action) => {
      // loop over each item in list
      action.payload.forEach((date) => {
        const indexOfDateToDelete = state.days.findIndex(
          (eachDay: JournalDay) => eachDay.date === date,
        )
        const indexOfTodosToDelete = state.todosPerDay.findIndex((eachDay) => eachDay.date === date)

        const formattedDate = dayjs(date).format(DATE_FORMAT_SORTABLE)

        if (indexOfDateToDelete === -1) {
          const day: JournalDay = {
            date: formattedDate,
            lastModifiedDate: formattedDate,
          }
          state.days.push(day)
        }
        if (indexOfTodosToDelete === -1) {
          state.todosPerDay.push({ date: formattedDate, todos: [] })
        }
      })
    })
    .addCase(removeDay, (state, action) => {
      const indexOfDateToDelete = state.days.findIndex(
        (eachDay: JournalDay) => eachDay.date === action.payload,
      )
      const indexOfTodosToDelete = state.todosPerDay.findIndex(
        (eachDay) => eachDay.date === action.payload,
      )

      console.log(indexOfDateToDelete, indexOfTodosToDelete)
      state.days.splice(indexOfDateToDelete, 1)
      state.todosPerDay.splice(indexOfTodosToDelete, 1)
    })
    .addCase(addReminderForDay, (state, action) => {
      const matchingId = state.todosPerDay.findIndex(
        (todo: TodosPerDay) => todo.date === action.payload.dayId,
      )
      state.todosPerDay[matchingId].todos.push(createTodo(action.payload.description, false))
    })
    .addCase(removeReminderForDay, (state, action) => {
      const matchingDayId = state.todosPerDay.findIndex(
        (todo: TodosPerDay) => todo.date === action.payload.dayId,
      )
      state.todosPerDay[matchingDayId].todos.splice(action.payload.reminderIndex, 1)
    })
    .addCase(toggleReminderDone, (state, action) => {
      const matchingDayId = state.todosPerDay.findIndex(
        (todo: TodosPerDay) => todo.date === action.payload.dayId,
      )
      const isDone = state.todosPerDay[matchingDayId].todos[action.payload.reminderIndex].isDone
      state.todosPerDay[matchingDayId].todos[action.payload.reminderIndex].isDone = !isDone
    })
    .addCase(setNumberOfDaysVisible, (state, action) => {
      state.numberOfDaysVisible = action.payload
    })
})
