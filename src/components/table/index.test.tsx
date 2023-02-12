import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TableComponent } from "./index";
/** @jest-environment */

const pagination = {
  has_next_page: false,
  has_previous_page: false,
  page: 1,
  take: 10,
  page_count: 1,
};

interface IRoute {
  origin: string;
  destination: string;
}

interface IPagination {
  has_next_page: boolean;
  has_previous_page: boolean;
  page: number;
  take: number;
  page_count: number;
}

const tableComponent = (
  <TableComponent
    deliveries={[]}
    setOpenMapModal={function (value: React.SetStateAction<boolean>): void {}}
    onCalculateRoute={function ({ origin, destination }: IRoute): void {}}
    pagination={pagination}
    setPagination={function (value: React.SetStateAction<IPagination>): void {}}
    onHandlerPaginationChange={function (e: any, { activePage }: any): void {}}
  />
);

test("render the table header elements", async () => {
  render(tableComponent);
  const headerNameElement = await screen.findByText("Name");
  const headerDateElement = await screen.findByText("Date");
  const headerFromElement = await screen.findByText("From");
  const headerToElement = await screen.findByText("To");

  expect(headerNameElement).toBeInTheDocument();
  expect(headerDateElement).toBeInTheDocument();
  expect(headerFromElement).toBeInTheDocument();
  expect(headerToElement).toBeInTheDocument();
});

test("render the pagination of table", async () => {
  render(tableComponent);
  const headerNameElement = await screen.findByRole("navigation");

  expect(headerNameElement).toBeInTheDocument();
});
