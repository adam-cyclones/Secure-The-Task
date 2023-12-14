import React, { useState } from "react";
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

function App() {
  const tasks: Task[] = [
    {
      title: "Love the world world",
      status: "todo",
      description: "do a thing",
      dueDate: "2 days",
      id: "1234",
      priority: "_1",
    },
    {
      title: "Take care of yourself",
      status: "todo",
      description: "do a thing",
      dueDate: "2 days",
      id: "1235",
      priority: "_2",
    },
    {
      title: "Feed the dog",
      status: "todo",
      description: "do a thing",
      dueDate: "2 days",
      id: "1236",
      priority: "_3",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <UserProvider>
      <LangProvider text={en}>
        <div className="App">
          <AppNavbar></AppNavbar>
          <Container className="p-0">
            <Row className="justify-content-md-center">
              <Col xs lg="6">
                <TaskSearchbar searchFn={handleSearch} />
                <TaskContent
                  tasks={tasks.filter((item) => {
                    const regex = new RegExp(searchTerm, "i");
                    return (
                      item.title.includes(searchTerm) ||
                      regex.test(item.title) ||
                      (item.description && regex.test(item.description))
                    );
                  })}
                />
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
