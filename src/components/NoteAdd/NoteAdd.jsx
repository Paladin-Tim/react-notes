import { useState } from "react";
import { Input, Popover, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useInput } from "../../hooks/useInput";
import { ref, push } from "firebase/database";
import { db } from "../../firebase";

export const NoteAdd = ({ setIsLoading }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleOpenChange = (newOpen) => {
    setIsPopoverOpen(newOpen);
  };

  const todosDBRef = ref(db, "todos");

  const addInput = useInput();

  const addNote = () => {
    setIsLoading(true);

    push(todosDBRef, {
      todo: addInput.value,
      completed: false,
    })
      .then(() => {
        addInput.clear("");
        isPopoverOpen(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Popover
      content={
        <section className="inputWrapper">
          <Input
            {...addInput}
            placeholder="Enter note"
            onPressEnter={addNote}
          />{" "}
          <Button size="medium" className="btnAppend" onClick={addNote}>
            Add
          </Button>
        </section>
      }
      title=""
      trigger="click"
      placement="left"
      open={isPopoverOpen}
      onOpenChange={handleOpenChange}
    >
      <Button
        icon={<PlusOutlined />}
        shape="circle"
        size="large"
        className="btnAdd"
      />
    </Popover>
  );
};
