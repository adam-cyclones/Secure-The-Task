import React from "react";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import AppNavbar from "./components/AppNavbar";
import TaskSearchbar from "./components/TaskSearchbar";
import type { Task } from "./types/App.types";
import TaskContent from "./components/TaskContent";
import { en } from "./lang";
import { LangProvider } from "./contexts/languageContext";
import { UserProvider } from "./contexts/userContext";
import TaskFooter from "./components/TaskFooter";

const tasks: Task[] = [
  {
    title: "hello world",
    status: "todo",
    description: "do a thing",
    dueDate: "2 days",
    id: "1234",
      priority: "_1",
  },
  {
    title: "hello world",
    status: "todo",
    description: "do a thing",
    dueDate: "2 days",
    id: "1234",
      priority: "_2",
  },
  {
    title: "hello world",
    status: "todo",
    description: "do a thing",
    dueDate: "2 days",
    id: "1234",
      priority: "_3",
  },
];
function App() {
  return (
    <UserProvider>
      <LangProvider text={en}>
        <div className="App">
          <AppNavbar></AppNavbar>
          <Container className="p-0">
            <Row className="justify-content-md-center">
              <Col xs lg="6">
                <TaskSearchbar />
                <TaskContent tasks={tasks} />
                <TaskFooter extraClassNames={"d-none d-md-block"} />
                <TaskFooter
                  extraClassNames={"d-sm-grid fixed-bottom d-md-none"}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </LangProvider>
    </UserProvider>
  );
}

export default App;
