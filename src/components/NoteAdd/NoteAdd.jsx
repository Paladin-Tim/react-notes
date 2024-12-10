import { useState } from "react";
import { Input, Popover, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useInput } from "../../hooks/useInput";

export const NoteAdd = ({ setIsLoading, refreshNotes }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleOpenChange = (newOpen) => {
    setIsPopoverOpen(newOpen);
  };

  const addInput = useInput();

  const addNote = () => {
    setIsLoading(true);

    fetch("http://localhost:3002/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        todo: addInput.value,
        completed: false,
      }),
    })
      .then(() => {
        refreshNotes();
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
