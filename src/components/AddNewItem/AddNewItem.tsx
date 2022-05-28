import React from "react";

import { Button, Box, TextInput, Paper } from "@mantine/core";

export type AddNewItemProps = {
  handleTodoTextChanged: React.ChangeEventHandler<HTMLInputElement> | undefined;
  handleAddClick: () => void;
  todo: string;
  buttonLabel?: string;
};

export const AddNewItem: React.FC<AddNewItemProps> = ({
  handleAddClick,
  handleTodoTextChanged,
  todo,
  buttonLabel = "add",
}) => {
  return (
    <Paper style={{ display: "flex" }} shadow="xs" p="md">
      <TextInput
        label="Add new item"
        onChange={handleTodoTextChanged}
        value={todo}
        variant="filled"
        style={{ width: "100%", paddingRight: "1rem" }}
      />
      <Button
        onClick={handleAddClick}
        disabled={!todo}
        style={{ marginLeft: "auto", alignSelf: "end" }}
      >
        {buttonLabel}
      </Button>
    </Paper>
  );
};

export default AddNewItem;
