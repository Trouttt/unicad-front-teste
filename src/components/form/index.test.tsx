import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormComponent } from "./index";
/** @jest-environment */

const form = {
  name_value: "pipi",
  date_value: "20/10/2022",
  origin_value: "Rua dr beiraldo",
  destination_value: "Rua tiradentes",

  name_isValid: true,
  date_isValid: true,
  origin_isValid: true,
  destination_isValid: true,
};

const formComponent = (
  <FormComponent
    form={form}
    onNameChangeHandler={function (
      event: React.ChangeEvent<HTMLInputElement>
    ): void {}}
    onNameValidatorHandler={function (): void {}}
    onDateChangeHandler={function (
      event: React.ChangeEvent<HTMLInputElement>
    ): void {}}
    onDateValidatorHandler={function (): void {}}
    onOriginChangeHandler={function (
      event: React.ChangeEvent<HTMLInputElement>
    ): void {}}
    onOriginValidatorHandler={function (): void {}}
    onDestinationChangeHandler={function (
      event: React.ChangeEvent<HTMLInputElement>
    ): void {}}
    onDestinationValidatorHandler={function (): void {}}
    onRegisterHandler={async function (
      event: React.FormEvent<Element>
    ): Promise<void> {}}
  />
);
test("render the input components", async () => {
  render(formComponent);
  const inputNameElement = await screen.findByPlaceholderText(
    "Ex: João oliveira de souza"
  );
  const inputDateElement = await screen.findByPlaceholderText("Ex: 20/10/2023");

  const inputOriginElement = await screen.findByPlaceholderText(
    "Ex: Rua Tiradentes de oliveira"
  );

  const inputDestinationElement = await screen.findByPlaceholderText(
    "Ex: Rua Dom Pedro Japão"
  );

  expect(inputDateElement).toBeInTheDocument();
  expect(inputNameElement).toBeInTheDocument();
  expect(inputOriginElement).toBeInTheDocument();
  expect(inputDestinationElement).toBeInTheDocument();
});
test("render the button components", async () => {
  render(formComponent);

  const buttonSubmitElement = await screen.findByText("Cadastrar");

  expect(buttonSubmitElement).toBeInTheDocument();
});

test("render the button components", async () => {
  render(formComponent);

  const buttonSubmitElement = await screen.findByText("Cadastrar");

  expect(buttonSubmitElement).toBeInTheDocument();
});
