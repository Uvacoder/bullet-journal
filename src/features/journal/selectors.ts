import { RootState } from '../../config/store'
import { JOURNAL_SLICE_KEY, DateString } from '.'
import dayjs from 'dayjs'
import { DATE_FORMAT_SORTABLE } from '../../utilities/magicValues'

export const selectSliceState = (state: RootState) => state[JOURNAL_SLICE_KEY]
export const selectDays = (state: RootState) => state[JOURNAL_SLICE_KEY].days
export const selectFilteredDays = (state: RootState) => {
  const days = [...state[JOURNAL_SLICE_KEY].days]

  const sorted = days.sort((a, b) => {
    if (a.date < b.date) return -1
    return a.date > b.date ? 1 : 0
  })
  const indexOfToday = sorted.findIndex(
    (eachDay) => eachDay.date === dayjs().format(DATE_FORMAT_SORTABLE),
  )
  if (indexOfToday === -1) return sorted
  if (state[JOURNAL_SLICE_KEY].numberOfDaysVisible === 0) return sorted

  const daysToShow = indexOfToday + state[JOURNAL_SLICE_KEY].numberOfDaysVisible

  const filtered = sorted.slice(indexOfToday, daysToShow)

  return filtered
}
export const selectTodosDays = (state: RootState) => state[JOURNAL_SLICE_KEY].todosPerDay
export const selectTodosForDay = (state: RootState, day: DateString) =>
  state[JOURNAL_SLICE_KEY].todosPerDay.find((item) => item.date === day)

export const selectUnfinishedTodos = (state: RootState, day: DateString) =>
  state[JOURNAL_SLICE_KEY].todosPerDay
    .find((item) => item.date === day)
    ?.todos.filter((todo) => todo.isDone !== true)

export const selectDaysInStore = (state: RootState) =>
  state[JOURNAL_SLICE_KEY].todosPerDay.map((item) => item.date)
export const selectNumberOfDaysVisible = (state: RootState) => {
  return state[JOURNAL_SLICE_KEY].numberOfDaysVisible
}
