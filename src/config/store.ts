import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { debounce } from 'debounce'

import { counterReducer, COUNTER_SLICE_KEY } from '../features/counter'
import { kanyeReducer, KANYE_SLICE_KEY } from '../features/kanye'
import { journalReducer, JOURNAL_SLICE_KEY } from '../features/journal'

import { saveState, loadState } from './utilities/browserStorage'

export const store = configureStore({
  reducer: {
    [COUNTER_SLICE_KEY]: counterReducer,
    [KANYE_SLICE_KEY]: kanyeReducer,
    [JOURNAL_SLICE_KEY]: journalReducer,
  },
  preloadedState: loadState(),
})
// here we subscribe to the store changes
store.subscribe(
  // we use debounce to save the state once each 800ms
  // for better performances in case multiple changes occur in a short time
  debounce(() => {
    console.log('Saving state')
    saveState(store.getState())
  }, 800),
)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
