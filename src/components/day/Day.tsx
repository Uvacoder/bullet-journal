import * as React from 'react'
import { List, Text, ThemeIcon, Title, Space, Progress, Button } from '@mantine/core'
import { CircleCheck, CircleDashed } from 'tabler-icons-react'

import {
  selectTodosForDay,
  addReminderForDay,
  removeReminderForDay,
  toggleReminderDone,
  selectUnfinishedTodos,
  removeDay,
  DateString,
} from '../../../features/journal'
import dayjs from 'dayjs'
import { useAppSelector, useAppDispatch } from '../../config/hooks'

import { TodoItem } from '../Todo'
import { AddNewItem } from '../AddNewItem'
import { DATE_FORMAT_LONG_FRIENDLY } from '../../utilities/magicValues'

export type DayProps = { dayId: DateString }

export function Day({ dayId = '' }: DayProps) {
  const dispatch = useAppDispatch()
  const [todo, setTodo] = React.useState('')
  const todosForDay = useAppSelector((state) => selectTodosForDay(state, dayId))
  const unfinishedTodos = useAppSelector((state) => selectUnfinishedTodos(state, dayId))

  const todosCount = todosForDay?.todos?.length || 0
  const remainingCount = unfinishedTodos?.length || 0
  const completedCount = todosCount - (unfinishedTodos?.length || 0)
  const percentComplete =
    completedCount > 0 && todosCount > 0
      ? Number(((completedCount / todosCount) * 100).toFixed(0))
      : 0

  const remainingLabel = `${percentComplete}%`

  const formattedDate = dayjs(dayId).format(DATE_FORMAT_LONG_FRIENDLY)

  const handleTodoTextChanged = React.useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => setTodo(event.target.value),
    [],
  )

  const handleDeleteTodo = React.useCallback(
    (id: number) => {
      dispatch(removeReminderForDay({ dayId, reminderIndex: id }))
    },
    [dispatch, dayId],
  )

  const handleToggleTodo = React.useCallback(
    (id: number) => {
      dispatch(toggleReminderDone({ dayId, reminderIndex: id }))
    },
    [dispatch, dayId],
  )

  const handleAddTodo = React.useCallback(
    (description: string) => {
      dispatch(addReminderForDay({ dayId, description }))
    },
    [dispatch, dayId],
  )

  const handleAddClick = () => {
    setTodo('')
    handleAddTodo(todo)
  }

  const handleRemoveDay = () => {
    dispatch(removeDay(dayId))
  }

  if (!dayId) return <></>

  return (
    <div>
      <Title order={4}>{formattedDate}</Title>
      <Text>{`${remainingCount} remaining`}</Text>
      <Progress value={percentComplete} label={remainingLabel} size='xl' radius='xl' />
      <Space h='md' />
      <AddNewItem
        handleAddClick={handleAddClick}
        todo={todo}
        handleTodoTextChanged={handleTodoTextChanged}
      />
      <Space h='lg' />
      <List
        icon={
          <ThemeIcon color='blue' size={24} radius='xl'>
            <CircleDashed size={16} />
          </ThemeIcon>
        }
        styles={{
          itemWrapper: {
            width: '100%',
            '& span:nth-of-type(2n)': {
              width: '100%',
            },
          },
        }}
        spacing={'md'}
      >
        {todosForDay?.todos.map((todo, index) => {
          return (
            <List.Item
              key={`${dayId}_todos_${index}`}
              icon={
                todo.isDone && (
                  <ThemeIcon color='blue' size={24} radius='xl'>
                    <CircleCheck size={16} />
                  </ThemeIcon>
                )
              }
            >
              <TodoItem
                todo={todo}
                itemIndex={index}
                handleToggleTodo={handleToggleTodo}
                handleDeleteTodo={handleDeleteTodo}
              />
            </List.Item>
          )
        })}
      </List>
      <Button onClick={() => handleRemoveDay()}>Remove day</Button>
    </div>
  )
}
