import * as React from "react";
import { List, Text, ThemeIcon, Title, Space, Progress } from "@mantine/core";
import { CircleCheck, CircleDashed } from "tabler-icons-react";

import { DateString } from "../../../features/journal";
import {
  selectTodosForDay,
  addReminderForDay,
  removeReminderForDay,
  toggleReminderDone,
  selectUnfinishedTodos,
} from "../../../features/journal";
import dayjs from "dayjs";
import { useAppSelector, useAppDispatch } from "../../hooks";

import { TodoItem } from "../Todo";
import { AddNewItem } from "../AddNewItem";
import { DATE_FORMAT_LONG_FRIENDLY } from "../../magicValues";

export type DayProps = { dayId: DateString };

export function Day({ dayId = "" }: DayProps) {
  const dispatch = useAppDispatch();
  const [todo, setTodo] = React.useState("");
  const todosForDay = useAppSelector((state) =>
    selectTodosForDay(state, dayId)
  );
  const unfinishedTodos = useAppSelector((state) =>
    selectUnfinishedTodos(state, dayId)
  );

  const todosCount = todosForDay?.todos?.length || 0;
  const remainingCount = unfinishedTodos?.length || 0;
  const completedCount = todosCount - (unfinishedTodos?.length || 0);
  const remainingPercent = Number(
    ((completedCount / todosCount) * 100).toFixed(0)
  );

  const remainingLabel = `${remainingPercent}%`;

  const formattedDate = dayjs(dayId).format(DATE_FORMAT_LONG_FRIENDLY);

  const handleTodoTextChanged = React.useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) =>
      setTodo(event.target.value),
    []
  );

  const handleDeleteTodo = React.useCallback(
    (id: number) => {
      dispatch(removeReminderForDay({ dayId, reminderIndex: id }));
    },
    [dispatch, dayId]
  );

  const handleToggleTodo = React.useCallback(
    (id: number) => {
      dispatch(toggleReminderDone({ dayId, reminderIndex: id }));
    },
    [dispatch, dayId]
  );

  const handleAddTodo = React.useCallback(
    (description: string) => {
      dispatch(addReminderForDay({ dayId, description }));
    },
    [dispatch, dayId]
  );

  const handleAddClick = () => {
    setTodo("");
    handleAddTodo(todo);
  };

  if (!dayId) return <></>;

  return (
    <div>
      <Title order={4}>{formattedDate}</Title>
      <Text>{`${remainingCount} remaining`}</Text>
      <Progress
        value={remainingPercent}
        label={remainingLabel}
        size="xl"
        radius="xl"
      />
      <Space h="md" />
      <AddNewItem
        handleAddClick={handleAddClick}
        todo={todo}
        handleTodoTextChanged={handleTodoTextChanged}
      />
      <Space h="lg" />
      <List
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <CircleDashed size={16} />
          </ThemeIcon>
        }
        styles={{
          itemWrapper: {
            width: "100%",
            "& span:nth-of-type(2n)": {
              width: "100%",
            },
          },
        }}
        spacing={"md"}
      >
        {todosForDay?.todos.map((todo, index) => {
          return (
            <List.Item
              key={`${dayId}_todos_${index}`}
              icon={
                todo.isDone && (
                  <ThemeIcon color="blue" size={24} radius="xl">
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
          );
        })}
      </List>
    </div>
  );
}
