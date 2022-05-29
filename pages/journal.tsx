import React, { useEffect, useState } from 'react'

import { useAppSelector, useAppDispatch } from '../src/config/hooks'
import {
  selectDaysInStore,
  addDay,
  addDays,
  selectNumberOfDaysVisible,
  selectFilteredDays,
  setNumberOfDaysVisible,
} from '../src/features/journal'

import { Day } from '../src/data-components/Day'
import { Button, Container, Paper, Select, Space, Stack, Text, Title } from '@mantine/core'
import { GridLayout } from '../src/components/GridLayout/'
import { DatePicker } from '@mantine/dates'
import dayjs from 'dayjs'
import { DATE_FORMAT_SORTABLE } from '../src/utilities/magicValues'
import { useHumanGreeting } from '../src/react-hooks/useHumanGreeting'

export default function App() {
  const days = useAppSelector(selectFilteredDays)
  const dayIds = useAppSelector(selectDaysInStore)
  const numberOfDaysVisible = useAppSelector(selectNumberOfDaysVisible)
  const [selectedDate, setSelectedDate] = useState<Date | null>()
  const dispatch = useAppDispatch()

  const greeting = useHumanGreeting()

  const onAddDayClick = React.useCallback(() => {
    selectedDate && dispatch(addDay(selectedDate.toString()))
    setSelectedDate(null)
  }, [dispatch, selectedDate])

  useEffect(() => {
    const numberOfDaysToCreate = 14
    const daysToCreate = Array.from(Array(numberOfDaysToCreate).keys()).map((i) => {
      const date = dayjs().add(i, 'day')
      return date.format(DATE_FORMAT_SORTABLE)
    })
    dispatch(addDays(daysToCreate))
    dispatch(setNumberOfDaysVisible(7))
  }, [dispatch])

  return (
    <Container>
      <Title order={1}>{greeting}</Title>
      <Space m='lg' />
      <GridLayout
        id='days'
        items={days.map((entryId) => (
          <Day dayId={entryId.date} key={`day_${entryId.date}`} />
        ))}
      />
      <Space m='xl' />
      <Paper shadow='md' p={'md'}>
        <Stack>
          <Title order={2}>Page Settings</Title>
          <Space m='sm' />
          <Select
            label='Days to show'
            placeholder='Pick one'
            data={[
              { value: '0', label: 'All' },
              { value: '1', label: 'Today' },
              { value: '3', label: '3 Days' },
              { value: '7', label: 'Week' },
              { value: '14', label: '2 Weeks' },
            ]}
            value={String(numberOfDaysVisible)}
            onChange={(e) => e && dispatch(setNumberOfDaysVisible(Number(e)))}
          />
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
        </Stack>
      </Paper>
    </Container>
  )
}
