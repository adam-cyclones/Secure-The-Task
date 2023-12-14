import { ListGroup } from "react-bootstrap";
import type { Task } from "../types/App.types";
import TaskCardItem from "./TaskCardItem";

interface TaskContentProps {
  /**
   * None or Some tasks to do, get them done!.
   */
  tasks: Task[];
}

function TaskContent({ tasks }: TaskContentProps) {
  return (
    <>
      <main>
        <ListGroup variant="flush">
          {tasks.map((task) => (
            <TaskCardItem key={task.id} task={task} />
          ))}
        </ListGroup>
      </main>
    </>
  );
}

export default TaskContent;
