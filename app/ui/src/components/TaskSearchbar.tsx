import { Button, Container, Form, Navbar } from "react-bootstrap";
import { useUiText } from "../hooks/uiText";

function TaskSearchbar() {
  const uiText = useUiText();
  return (
    <Navbar className="search-bar pt-0 pb-0 mb-4">
      <Container>
        <Form className="d-flex flex-fill">
          <Form.Control
            size="lg"
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="link">{uiText.searchText}</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default TaskSearchbar;
