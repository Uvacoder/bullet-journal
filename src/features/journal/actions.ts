import { createAction } from '@reduxjs/toolkit'
import { DateString } from '.'

export type AddReminderPayload = { dayId: DateString; description: string }
export type RemoveReminderPayload = {
  dayId: DateString
  reminderIndex: number
}
export const addDay = createAction<DateString>('journal/addDay')
export const addDays = createAction<DateString[]>('journal/addDays')
export const removeDay = createAction<DateString>('journal/removeDay')
export const addReminderForDay = createAction<AddReminderPayload>('journal/addReminderForDay')
export const removeReminderForDay = createAction<RemoveReminderPayload>(
  'journal/removeReminderForDay',
)
export const toggleReminderDone = createAction<RemoveReminderPayload>('journal/toggleReminderDone')
export const setNumberOfDaysVisible = createAction<number>('journal/setNumberOfDaysVisible')
