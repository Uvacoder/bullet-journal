import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { counterReducer, COUNTER_SLICE_KEY } from "../features/counter";
import { kanyeReducer, KANYE_SLICE_KEY } from "../features/kanye";
import { journalReducer, JOURNAL_SLICE_KEY } from "../features/journal";

export const store = configureStore({
  reducer: {
    [COUNTER_SLICE_KEY]: counterReducer,
    [KANYE_SLICE_KEY]: kanyeReducer,
    [JOURNAL_SLICE_KEY]: journalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
