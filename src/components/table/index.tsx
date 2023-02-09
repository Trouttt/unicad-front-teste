import React from "react";
import {
  Button,
  Icon,
  Menu,
  Modal,
  Pagination,
  Table,
} from "semantic-ui-react";
import { FormComponent } from "../form";

interface IRoute {
  origin: string;
  destination: string;
}

interface IDelivery extends IRoute {
  id: string;
  name: string;
  date: string;
}

interface IPagination {
  has_next_page: false;
  has_previous_page: false;
  page: number;
  take: number;
  page_count: number;
}

interface IProps {
  deliveries: IDelivery[];
  setOpenMapModal: React.Dispatch<React.SetStateAction<boolean>>;
  onCalculateRoute: ({ origin, destination }: IRoute) => {};
  pagination: IPagination;
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>;
  onHandlerPaginationChange: (e: any, { activePage }: any) => void;
}

export const TableComponent: React.FC<IProps> = ({
  deliveries,
  onHandlerPaginationChange,
  setOpenMapModal,
  onCalculateRoute,
  pagination,
}) => {
  const columnData = deliveries.map((delivery) => (
    <Table.Row
      key={delivery.id}
      onClick={() => {
        onCalculateRoute({
          origin: delivery.origin,
          destination: delivery.destination,
        });
        setOpenMapModal(true);
      }}
    >
      <Table.Cell>{delivery.name}</Table.Cell>
      <Table.Cell>{delivery.date}</Table.Cell>
      <Table.Cell>{delivery.origin}</Table.Cell>
      <Table.Cell>{delivery.destination}</Table.Cell>
    </Table.Row>
  ));

  return (
    <Table celled structured stackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>From</Table.HeaderCell>
          <Table.HeaderCell>To</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{columnData}</Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="5">
            <Pagination
              onPageChange={onHandlerPaginationChange}
              boundaryRange={0}
              defaultActivePage={1}
              ellipsisItem={null}
              firstItem={null}
              activePage={pagination.page}
              lastItem={null}
              siblingRange={2}
              totalPages={pagination.page_count}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};
