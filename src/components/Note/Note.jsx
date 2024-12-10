import { useState } from "react";
import { Checkbox, Input, Button } from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import { useInput } from "../../hooks/useInput";

export const Note = ({
  id,
  todo,
  completed,
  index,
  completNote,
  editNote,
  removeNote,
}) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const editInput = useInput(todo);

  return (
    <li key={id} className="todoItemWrapper">
      <div className={`todoItem ${completed && "completed"} `}>
        <Checkbox
          checked={completed}
          onClick={() => completNote(id, completed, index)}
        ></Checkbox>
        {!isEditorOpen && <span className="todoText">{todo}</span>}
        {isEditorOpen && (
          <Input
            className="editInput"
            {...editInput}
            onPressEnter={() => {
              editNote(id, index, editInput.value);
              setIsEditorOpen(false);
            }}
          />
        )}

        <section className="todoButtons">
          {!isEditorOpen ? (
            <Button
              color="default"
              variant="text"
              icon={<EditOutlined />}
              size="large"
              className="btnEdit"
              disabled={completed}
              onClick={() => setIsEditorOpen(true)}
            />
          ) : (
            <Button
              color="default"
              variant="text"
              icon={<CheckOutlined />}
              size="large"
              className="btnEdit"
              onClick={() => {
                editNote(id, index, editInput.value);
                setIsEditorOpen(false);
              }}
            />
          )}
          <Button
            color="default"
            variant="text"
            icon={<DeleteOutlined />}
            size="large"
            className="btnDelete"
            onClick={() => removeNote(id)}
          />
        </section>
      </div>
    </li>
  );
};
