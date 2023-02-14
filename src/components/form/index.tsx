import { Autocomplete } from "@react-google-maps/api";
import React from "react";
import { Button, Container, Form } from "semantic-ui-react";

interface IForm {
  name_value: string;
  date_value: string;
  origin_value: string;
  destination_value: string;

  name_isValid: boolean;
  date_isValid: boolean;
  origin_isValid: boolean;
  destination_isValid: boolean;
}

interface IProps {
  form: IForm;
  onNameChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNameValidatorHandler: () => void;
  onDateChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDateValidatorHandler: () => void;
  onOriginChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onOriginValidatorHandler: () => void;
  onDestinationChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onDestinationValidatorHandler: () => void;
  onRegisterHandler: (event: React.FormEvent) => Promise<void>;
}

export const FormComponent: React.FC<IProps> = ({
  form,
  onNameChangeHandler,
  onNameValidatorHandler,
  onDateChangeHandler,
  onDateValidatorHandler,
  onDestinationChangeHandler,
  onDestinationValidatorHandler,
  onOriginChangeHandler,
  onOriginValidatorHandler,
  onRegisterHandler,
}: IProps) => {
  return (
    <Container style={{ padding: "2%" }}>
      <Form onSubmit={onRegisterHandler}>
        <Form.Field>
          <label>Nome do cliente</label>
          <input
            value={form.name_value}
            onChange={onNameChangeHandler}
            onBlur={onNameValidatorHandler}
            placeholder="Ex: João oliveira de souza"
          />
        </Form.Field>
        <Form.Field>
          <label>Data</label>

          <input
            value={form.date_value}
            onChange={onDateChangeHandler}
            onBlur={onDateValidatorHandler}
            type="date"
            placeholder="Ex: 20/10/2023"
          />
        </Form.Field>

        <Form.Field>
          <label>Origem</label>
          <input
            value={form.origin_value}
            onChange={onOriginChangeHandler}
            onBlur={onOriginValidatorHandler}
            placeholder="Ex: Rua Tiradentes de oliveira"
          />
        </Form.Field>

        <Form.Field>
          <label>Destino</label>

          <input
            value={form.destination_value}
            onChange={onDestinationChangeHandler}
            onBlur={onDestinationValidatorHandler}
            placeholder="Ex: Rua Dom Pedro Japão"
          />
        </Form.Field>

        <Button color="green" type="submit">
          Cadastrar
        </Button>
      </Form>
    </Container>
  );
};
