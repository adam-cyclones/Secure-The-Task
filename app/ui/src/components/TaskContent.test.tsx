import React from "react";
import { render, screen } from "@testing-library/react";
import TaskContent from "./TaskContent";
import { LangProvider } from "../contexts/languageContext";
import { UserProvider } from "../contexts/userContext";
import { en } from "../lang";
import { Task } from "../types/App.types";

test("renders a card", () => {
  const mockTask: Task = {
    title: "hello world",
    status: "todo",
    description: "do a thing",
    dueDate: "2 days",
    id: "1234",
    priority: "1",
  };
  render(
    <UserProvider>
      <LangProvider text={en}>
        <TaskContent tasks={[mockTask]} />
      </LangProvider>
    </UserProvider>,
  );
  const brandName = screen.getByText(/hello world/i);
  expect(brandName).toBeInTheDocument();
});
