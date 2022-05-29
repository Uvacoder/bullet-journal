import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../src/hooks'
import { selectDays, selectDaysInStore, addDay } from '../features/journal'

import { Day } from '../src/components/Day'
import { Button, Container, Paper } from '@mantine/core'
import { GridLayout } from '../src/components/GridLayout/'
import { DatePicker } from '@mantine/dates'
import dayjs from 'dayjs'
import { DATE_FORMAT_SORTABLE } from '../src/magicValues'
import { useHumanGreeting } from '../src/reactHooks'

export default function App() {
  const days = useAppSelector(selectDays)
  const dayIds = useAppSelector(selectDaysInStore)
  const [selectedDate, setSelectedDate] = useState<Date | null>()
  const dispatch = useAppDispatch()

  const greeting = useHumanGreeting()

  const onAddDayClick = React.useCallback(() => {
    selectedDate && dispatch(addDay(selectedDate.toString()))
    setSelectedDate(null)
  }, [dispatch, selectedDate])

  return (
    <Container>
      <h1>{greeting}</h1>
      <Paper>
        <DatePicker
          placeholder='Pick date'
          label='Create new day'
          value={selectedDate}
          onChange={(event) => event && setSelectedDate(event)}
          excludeDate={(date) => dayIds.includes(dayjs(date).format(DATE_FORMAT_SORTABLE))}
        />
        <Button
          disabled={!selectedDate}
          onClick={() => onAddDayClick()}
        >{`Add ${selectedDate?.getDate()}`}</Button>
      </Paper>
      <GridLayout
        id='days'
        items={days.map((entryId) => (
          <Day dayId={entryId.date} key={`day_${entryId.date}`} />
        ))}
      />
    </Container>
  )
}
