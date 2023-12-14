import { Button } from "react-bootstrap";
import { useUiText } from "../hooks/uiText";

interface TaskFooterProps {
  /**
   * The footer(s) changes position for better user experience on a mobile,
   */
  extraClassNames: string;
}

function TaskFooter({ extraClassNames }: TaskFooterProps) {
  const uiText = useUiText();
  const className = `gap-2 mt-4 ${extraClassNames}`;
  return (
    <footer className="d-grid pl-4 pr-4">
      <Button className={className} size="lg" variant="primary">
        {uiText.addItem}
      </Button>
    </footer>
  );
}

export default TaskFooter;
