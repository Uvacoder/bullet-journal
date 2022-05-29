import React from 'react'
import { Box, Text, Transition, ActionIcon } from '@mantine/core'
import { TrashX } from 'tabler-icons-react'
import { Todo } from '../../features/journal'

export type TodoItemProps = {
  itemIndex: number
  todo: Todo
  handleToggleTodo: (index: number) => void
  handleDeleteTodo: (index: number) => void
}

export const TodoItem: React.FC<TodoItemProps> = ({
  itemIndex,
  todo,
  handleToggleTodo,
  handleDeleteTodo,
}) => {
  return (
    <>
      <Box style={{ display: 'flex' }}>
        <Text
          variant='text'
          onClick={() => handleToggleTodo(itemIndex)}
          style={{ width: '100%' }}
          color={todo.isDone ? 'dimmed' : 'dark'}
        >
          {todo.title}
        </Text>
        <Transition mounted={true} transition='fade' duration={400} timingFunction='ease'>
          {(styles) => (
            <div style={styles}>
              <ActionIcon
                onClick={() => handleDeleteTodo(itemIndex)}
                style={{ marginLeft: 'auto' }}
                color='red'
                variant='light'
              >
                <TrashX size={16} />
              </ActionIcon>
            </div>
          )}
        </Transition>
      </Box>
    </>
  )
}

export default TodoItem
