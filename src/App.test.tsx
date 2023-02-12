import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
/** @jest-environment */

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/eae/);
  expect(linkElement).toBeInTheDocument();
});
