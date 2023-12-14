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

  return (
    <ListGroup.Item style={{ border: 0 }}>
      <Form>
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <Form.Control
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
                className="text-nowrap"
              >
                {isEditing
                  ? `🔓 ${uiText.saveBtnText}`
                  : `🔒 ${uiText.editBtnText}`}
              </Button>
              <Button variant="outline-danger" size="sm">
                {uiText.deleteBtnText}
              </Button>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Form.Control
              defaultValue={task.description}
              ref={taskBodyRef}
              as="textarea"
              rows={3}
              readOnly={!isEditing}
              className={!isEditing ? "readonly-disguise" : ""}
            ></Form.Control>
          </Card.Body>
          {isEditing && (
            <Card.Footer>
              <Form>
                <Form.Select aria-label="Default select example">
                  <option>{uiText.taskPriorityControlLabel}</option>
                  <option value="_0">{uiText.taskPriorityLevel0}</option>
                  <option value="_1">{uiText.taskPriorityLevel1}</option>
                  <option value="_2">{uiText.taskPriorityLevel2}</option>
                </Form.Select>
              </Form>
            </Card.Footer>
          )}
        </Card>
      </Form>
    </ListGroup.Item>
  );
}

export default TaskCardItem;
