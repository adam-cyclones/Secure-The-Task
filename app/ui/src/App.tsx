import React, { useEffect, useState } from "react";
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
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!process.env.REACT_APP_TASKS_API_URL) {
      throw new Error(
        "Missing TASKS_API_URL environment variable, unable to fetch tasks.",
      );
    }
    fetch(`${process.env.REACT_APP_TASKS_API_URL}/api/tasks`)
      .then((response) => {
        response.json().then((d) => {
          setTasks(d);
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

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
                  tasks={
                    tasks.filter((item) => {
                      const regex = new RegExp(searchTerm, "i");
                      return (
                        item.title.includes(searchTerm) ||
                        regex.test(item.title) ||
                        (item.description && regex.test(item.description))
                      );
                    }) || []
                  }
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
