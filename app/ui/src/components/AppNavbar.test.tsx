import React from "react";
import { render, screen } from "@testing-library/react";
import AppNavbar from "./AppNavbar";
import { LangProvider } from "../contexts/languageContext";
import { UserProvider } from "../contexts/userContext";
import { en } from "../lang";

test("renders app navbar with brandname", () => {
  render(
    <UserProvider>
      <LangProvider text={en}>
        <AppNavbar />
      </LangProvider>
    </UserProvider>,
  );
  const brandName = screen.getByText(/Secure The Task/i);
  expect(brandName).toBeInTheDocument();
});
