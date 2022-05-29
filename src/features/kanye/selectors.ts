import { RootState } from '../../config/store'
import { createSelector } from '@reduxjs/toolkit'

import { KANYE_SLICE_KEY } from '.'

export const selectKanye = (state: RootState) => state[KANYE_SLICE_KEY]

export const kanyeQuoteSelector = createSelector(selectKanye, (state) => state)
