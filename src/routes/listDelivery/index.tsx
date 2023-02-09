import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import React, { type SetStateAction, useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  Menu,
  Table,
} from "semantic-ui-react";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import { FormComponent } from "../../components/form";
import { TableComponent } from "../../components/table";

interface ITravel {
  origin: string;
  destination: string;
}

export const Teste: React.FC = () => {
  const [openFormModal, setOpenFormModal] = useState<boolean>(false);
  const [openMapModal, setOpenMapModal] = useState<boolean>(false);
  const [, setMap] = useState<unknown>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const calculateRoute = async ({
    origin,
    destination,
  }: ITravel): Promise<void> => {
    const directionsService = new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
  };

  const clearRoute = async (): Promise<void> => {
    setDirectionsResponse(null);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCfcMKydB04tatWePmkKNmPoU1jyoyrfDw",
    libraries: ["places"],
  });

  const rows = [
    {
      id: "1",
      name: "alpha",
      date: "pipi",
      origin: "São Paulo",
      destination: "Rio de Janeiro",
    },
    {
      id: "2",
      name: "alpha",
      date: "pipi",
      origin: "Recife",
      destination: "Paraíba",
    },
  ];
  return (
    <Container>
      <Modal
        closeOnDimmerClick={false}
        onClose={() => {
          setOpenFormModal(false);
        }}
        size="large"
        onOpen={() => {
          setOpenFormModal(true);
        }}
        open={openFormModal}
        trigger={
          <Button style={{ margin: "2vh 0vw" }} primary>
            Cadastrar Entrega
          </Button>
        }
      >
        <Modal.Header>
          <Button
            onClick={() => {
              setOpenFormModal(false);
            }}
            negative
          >
            Cancelar Cadastro
          </Button>
        </Modal.Header>
        <FormComponent />
      </Modal>
      <Modal
        closeOnDimmerClick={false}
        onClose={() => {
          setOpenMapModal(false);
        }}
        size="large"
        onOpen={() => {
          setOpenMapModal(true);
        }}
        open={openMapModal}
      >
        {isLoaded && (
          <GoogleMap
            zoom={15}
            mapContainerStyle={{ width: "70vw", height: "70vh" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => {
              setMap(map);
            }}
          >
            {directionsResponse != null && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        )}
        <Modal.Actions>
          <Button
            color="red"
            content="Fechar"
            onClick={() => {
              setOpenMapModal(false);
              void clearRoute();
            }}
          />
        </Modal.Actions>
      </Modal>
      <Divider />
      <TableComponent
        openFormModal={openFormModal}
        openMapModal={openMapModal}
        deliveries={rows}
        setOpenFormModal={setOpenFormModal}
        setOpenMapModal={setOpenMapModal}
        calculateRoute={calculateRoute}
      />
    </Container>
  );
};
