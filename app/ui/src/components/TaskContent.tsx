import { Button, Card, ListGroup, Stack } from "react-bootstrap";
import type { Task } from "../types/App.types";
import { useUiText } from "../hooks/uiText";

interface TaskContentProps {
  /**
   * None or Some tasks to do, get them done!.
   */
  tasks: Task[];
}

function TaskContent({ tasks }: TaskContentProps) {
  const uiText = useUiText();
  return (
    <>
      <main>
        <ListGroup variant="flush">
          {tasks.map((task) => (
            <ListGroup.Item style={{ border: 0 }}>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <p className="m-0">{task.title}</p>
                  <Stack
                    className="ml-auto justify-content-between"
                    direction="horizontal"
                  >
                    <Button variant="outline-secondary" size="sm">
                      {uiText.editBtnText}
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      {uiText.deleteBtnText}
                    </Button>
                  </Stack>
                </Card.Header>
                <Card.Body>{task.description}</Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </main>
    </>
  );
}

export default TaskContent;
