import React, { memo, useState, useCallback } from "react";

interface Props {
  addTodo: (name: string, description: string) => void;
}

export const NewTodoComponent: React.FC<Props> = memo(({ addTodo }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    []
  );

  const onDescriptionChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value);
    },
    []
  );

  const onSave = useCallback(() => {
    if (name) addTodo(name, description);
    setName("");
    setDescription("");
  }, [addTodo, name, description]);

  return (
    <div className="new-todo">
      <div className="input">
        <label className="label">
          Name:
          <input type="text" value={name} onChange={onNameChange} />
        </label>
      </div>
      <div className="input">
        <label className="label">
          Description:
          <input
            value={description}
            onChange={onDescriptionChange}
            type="text"
          />
        </label>
      </div>

      <button className="save-btn" onClick={onSave}>
        ADD NEW
      </button>
    </div>
  );
});
