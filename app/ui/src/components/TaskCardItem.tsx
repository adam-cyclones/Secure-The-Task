import React, { useRef, useState } from "react";
import { Button, Card, Form, ListGroup, Stack } from "react-bootstrap";
import type { Task } from "../types/App.types";
import { useUiText } from "../hooks/uiText";

interface TaskCardItemProps {
  task: Task;
}

function TaskCardItem({ task }: TaskCardItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const uiText = useUiText();
  const taskBodyRef = useRef<HTMLTextAreaElement>(null);
  const cardFormRef = useRef<HTMLFormElement>(null);
  const [notYetPersistedTask, setTask] = useState(task);

  const focusSelectTaskbody = () => {
    if (taskBodyRef && taskBodyRef.current) {
      taskBodyRef.current.focus();
      taskBodyRef.current.select();
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      focusSelectTaskbody();
    }
  };

  /**
   * Savees a cards title, description, priority,
   * Note: due-date not impl at this time due to potential UI complexity
   */
  const handleSave = () => {
    if (cardFormRef.current) {
      const formData = new FormData(cardFormRef.current);
      const updatedTask = {
        ...notYetPersistedTask,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        priority: formData.get("priority") as string,
      };
      setTask(updatedTask);
    }
    toggleEditMode();
  };

  return (
    <ListGroup.Item style={{ border: 0 }}>
      <Form ref={cardFormRef}>
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <Form.Control
              name="title"
              type="text"
              readOnly={!isEditing}
              defaultValue={task.title}
              className={!isEditing ? "readonly-disguise" : ""}
            />
            <Stack gap={3} direction="horizontal">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => toggleEditMode()}
                className={`text-nowrap ${isEditing ? "d-none" : ""}`}
              >
                {`🔒 ${uiText.editBtnText}`}
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleSave}
                className={`text-nowrap ${isEditing ? "" : "d-none"}`}
              >
                {`🔓 ${uiText.saveBtnText}`}
              </Button>
              <Button variant="outline-danger" size="sm">
                {uiText.deleteBtnText}
              </Button>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Form.Control
              name="description"
              defaultValue={task.description}
              ref={taskBodyRef}
              as="textarea"
              aria-label={uiText.cardBodyA11yLabel}
              rows={3}
              readOnly={!isEditing}
              className={!isEditing ? "readonly-disguise" : ""}
            />
          </Card.Body>
          {isEditing && (
            <Card.Footer>
              <Form.Label htmlFor="priority">
                {uiText.taskPriorityControlLabel}
              </Form.Label>
              <Form.Select
                id="priority"
                name="priority"
                aria-label={uiText.taskPriorityControlLabel}
                defaultValue={task.priority}
              >
                <option value="_0">{uiText.taskPriorityLevel0}</option>
                <option value="_1">{uiText.taskPriorityLevel1}</option>
                <option value="_2">{uiText.taskPriorityLevel2}</option>
              </Form.Select>
            </Card.Footer>
          )}
        </Card>
      </Form>
    </ListGroup.Item>
  );
}

export default TaskCardItem;
