import { Container, Form, Navbar } from "react-bootstrap";
import { useUiText } from "../hooks/uiText";

interface TaskSearchbarProps {
  searchFn: (term: string) => void;
}

function TaskSearchbar({ searchFn }: TaskSearchbarProps) {
  const uiText = useUiText();

  return (
    <Navbar className="search-bar pt-0 pb-0 mb-4">
      <Container>
        <Form className="d-flex flex-fill">
          <Form.Control
            size="lg"
            type="search"
            placeholder={uiText.searchText}
            aria-label={uiText.searchText}
            onChange={(e) => searchFn((e.target as HTMLInputElement).value)}
          />
        </Form>
      </Container>
    </Navbar>
  );
}

export default TaskSearchbar;
