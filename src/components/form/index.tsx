import React from "react";
import { Button, Container, Form } from "semantic-ui-react";

export const FormComponent: React.FC = () => {
  return (
    <Container style={{ padding: "2%" }}>
      <Form>
        <Form.Field>
          <label>Nome do cliente</label>
          <input placeholder="Ex: João oliveira de souza" />
        </Form.Field>
        <Form.Field>
          <label>Data</label>
          <input type="date" placeholder="Ex: 20/10/2023" />
        </Form.Field>
        <Form.Field>
          <label>Origem</label>
          <input placeholder="Ex: Rua Tiradentes de oliveira" />
        </Form.Field>
        <Form.Field>
          <label>Destino</label>
          <input placeholder="Ex: Rua Dom Pedro Japão" />
        </Form.Field>
        <Button color="green" type="submit">
          Cadastrar
        </Button>
      </Form>
    </Container>
  );
};
