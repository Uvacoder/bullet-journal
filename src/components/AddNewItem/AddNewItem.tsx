import React from "react";

import { Button, Box, TextInput } from "@mantine/core";

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
    <Box style={{ display: "flex" }}>
      <TextInput
        onChange={handleTodoTextChanged}
        value={todo}
        variant="filled"
        style={{ width: "100%", paddingRight: "1rem" }}
      />
      <Button
        onClick={handleAddClick}
        disabled={!todo}
        style={{ marginLeft: "auto" }}
      >
        {buttonLabel}
      </Button>
    </Box>
  );
};

export default AddNewItem;
