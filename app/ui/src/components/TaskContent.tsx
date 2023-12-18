import { ListGroup } from "react-bootstrap";
import type { Task } from "../types/App.types";
import TaskCardItem from "./TaskCardItem";
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
          {!tasks.length ? uiText.tasksLoadingMessage : ""}
          {tasks.map((task) => (
            <TaskCardItem key={task.id} task={task} />
          ))}
        </ListGroup>
      </main>
    </>
  );
}

export default TaskContent;
