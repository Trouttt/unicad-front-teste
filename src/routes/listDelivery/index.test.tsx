import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ListDeliveryRoute } from "./index";
import { BrowserRouter } from "react-router-dom";
/** @jest-environment */
const listDeliveryRoute = (
  <BrowserRouter>
    <ListDeliveryRoute />
  </BrowserRouter>
);
test("render the button to open form modal", async () => {
  render(listDeliveryRoute);
  const buttonCancelElement = await screen.findByText("Cadastrar Entrega");

  expect(buttonCancelElement).toBeInTheDocument();
});
