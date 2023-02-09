import React from "react";
import { Button, Icon, Menu, Modal, Table } from "semantic-ui-react";
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

interface IProps {
  deliveries: IDelivery[];
  setOpenMapModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenFormModal: React.Dispatch<React.SetStateAction<boolean>>;
  calculateRoute: ({ origin, destination }: IRoute) => {};
  openMapModal: boolean;
  openFormModal: boolean;
}

export const TableComponent: React.FC<IProps> = ({
  openMapModal,
  openFormModal,
  deliveries,
  setOpenMapModal,
  setOpenFormModal,
  calculateRoute,
}) => {
  const columnData = deliveries.map((delivery) => (
    <Table.Row
      key={delivery.id}
      onClick={() => {
        calculateRoute({
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
      <Table.Cell>
        <Button>Atualizar</Button>
        <Button>Deletar</Button>
      </Table.Cell>
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
          <Table.HeaderCell>Ações</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{columnData}</Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="5">
            <Menu floated="right" pagination>
              <Menu.Item as="a" icon>
                <Icon name="chevron left" />
              </Menu.Item>
              <Menu.Item as="a">1</Menu.Item>
              <Menu.Item as="a">2</Menu.Item>
              <Menu.Item as="a">3</Menu.Item>
              <Menu.Item as="a">4</Menu.Item>
              <Menu.Item as="a" icon>
                <Icon name="chevron right" />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};
