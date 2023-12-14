import { Navbar, Container } from "react-bootstrap";
import UserMenu from "./UserMenu";
import { useUiText } from "../hooks/uiText";

function AppNavbar() {
  const uiText = useUiText();

  return (
    <Navbar variant="light">
      <Container>
        <Navbar.Brand href="#home">{uiText.brandName}</Navbar.Brand>
        <UserMenu />
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
