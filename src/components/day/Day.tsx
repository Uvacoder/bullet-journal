import * as React from "react";

import { DateString } from "../../../features/journal";
import {
  selectTodosForDay,
  addReminderForDay,
  removeReminderForDay,
} from "../../../features/journal";
import { useAppSelector, useAppDispatch } from "../../hooks";

export type DayProps = { dayId: DateString };

export function Day({ dayId = "" }: DayProps) {
  const [todo, setTodo] = React.useState("");
  const todosForDay = useAppSelector((state) =>
    selectTodosForDay(state, dayId)
  );
  const todosCount = todosForDay?.todos?.length || 0;
  const dispatch = useAppDispatch();
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

  const handleAddTodo = (description: string) => {
    dispatch(addReminderForDay({ dayId, description }));
  };

  const handleAddClick = () => handleAddTodo(todo);

  if (!dayId) return <></>;

  return (
    <div>
      <p>{`Day ${dayId} has ${todosCount} todos`}</p>
      <input
        title="Enter new task"
        onChange={handleTodoTextChanged}
        value={todo}
      />
      <button onClick={handleAddClick} disabled={!todo} type="button">
        add
      </button>
      <ul>
        {todosForDay?.todos.map((todo, index) => {
          return (
            <li key={`${dayId}_todos_${index}`}>
              {todo.title}
              <button type="button" onClick={() => handleDeleteTodo(index)}>
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
