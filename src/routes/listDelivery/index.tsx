import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import React, { useEffect, useReducer, useState } from "react";
import { Button, Container, Divider, Transition } from "semantic-ui-react";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import { FormComponent } from "../../components/form";
import { TableComponent } from "../../components/table";
import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import formReducer from "../../reducers/registerDeliveryFormReducer";
import { useParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";

interface ITravel {
  origin: string;
  destination: string;
}
interface IDelivery {
  id: string;
  name: string;
  date: string;
  origin: string;
  destination: string;
}

interface IPagination {
  has_next_page: boolean;
  has_previous_page: boolean;
  page: number;
  page_count: number;
  take: number;
}

export const ListDeliveryRoute: React.FC = () => {
  const page = useQuery().get("page");

  const libraries = String(["places"]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}`,
    [libraries]: libraries,
  });

  const formInitialState = {
    name_value: "",
    date_value: "",
    origin_value: "",
    destination_value: "",

    name_isValid: false,
    date_isValid: false,
    origin_isValid: false,
    destination_isValid: false,

    form_isValid: false,
  };
  const [formState, dispatchForm] = useReducer(formReducer, formInitialState);

  const [formData, setFormData] = useState<IDelivery[]>([]);
  const [openFormModal, setOpenFormModal] = useState<boolean>(false);
  const [openMapModal, setOpenMapModal] = useState<boolean>(false);
  const [, setMap] = useState<unknown>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [pagination, setPagination] = useState<IPagination>({
    has_next_page: false,
    has_previous_page: false,
    page: 1,
    page_count: 1,
    take: 10,
  });

  const calculateRouteHandler = async ({
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

  const clearRouteHandler = async (): Promise<void> => {
    setDirectionsResponse(null);
  };

  const nameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatchForm({ type: "NAME_INPUT", val: event.target.value });
  };

  const nameValidateHandler = (): void => {
    dispatchForm({ type: "NAME_BLUR", val: formState.name_value });
  };

  const dateChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatchForm({ type: "DATE_INPUT", val: event.target.value });
  };

  const dateValidateHandler = (): void => {
    dispatchForm({ type: "DATE_BLUR", val: formState.date_value });
  };

  const originChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatchForm({ type: "ORIGIN_INPUT", val: event.target.value });
  };

  const originValidateHandler = (): void => {
    dispatchForm({ type: "ORIGIN_BLUR", val: formState.origin_value });
  };

  const destinationChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatchForm({ type: "DESTINATION_INPUT", val: event.target.value });
  };

  const destinationValidateHandler = (): void => {
    dispatchForm({
      type: "DESTINATION_BLUR",
      val: formState.destination_value,
    });
  };

  const closeModalHandler = (): void => {
    setOpenFormModal(false);
    dispatchForm({ type: "default", val: "" });
  };

  const registerDeliveryHandler = async (
    event: React.FormEvent
  ): Promise<void> => {
    event.preventDefault();

    const body = {
      name: formState.name_value,
      date: formState.date_value,
      origin: formState.origin_value,
      destination: formState.destination_value,
    };

    try {
      const response = await api.post("/deliveries", body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      console.log(response);
      if (response.status === 201)
        toast.success("Cadastro realizado com sucesso", {
          position: "top-right",
        });

      window.location.href = "/";
    } catch (e: any) {
      console.log(e, "erro");
      toast.error("Erro ao cadastrar");
    }
  };

  const getDeliveriesHandler = async (page: number): Promise<void> => {
    try {
      const response = await api.get(
        `/deliveries?page=${page === undefined ? 1 : page}`
      );

      setFormData(response.data.data);
      setPagination(response.data.meta_data);
    } catch (e) {}
  };
  const handlePaginationChange = (e: any, { activePage }: any): void => {
    setPagination((prevState) => ({ ...prevState, page: activePage }));
  };

  useEffect(() => {
    void getDeliveriesHandler(pagination.page);
  }, [pagination.page]);
  useEffect(() => {
    void getDeliveriesHandler(page !== null ? parseInt(page) : 1);
  }, [page]);
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
        id="modalForm"
        open={openFormModal}
        trigger={
          <Button data-tes style={{ margin: "2vh 0vw" }} primary>
            Cadastrar Entrega
          </Button>
        }
      >
        <Modal.Header>
          <Button
            onClick={() => {
              closeModalHandler();
            }}
            negative
          >
            Cancelar Cadastro
          </Button>
        </Modal.Header>
        <FormComponent
          form={formState}
          onNameChangeHandler={nameChangeHandler}
          onNameValidatorHandler={nameValidateHandler}
          onDateChangeHandler={dateChangeHandler}
          onDateValidatorHandler={dateValidateHandler}
          onOriginChangeHandler={originChangeHandler}
          onOriginValidatorHandler={originValidateHandler}
          onDestinationChangeHandler={destinationChangeHandler}
          onDestinationValidatorHandler={destinationValidateHandler}
          onRegisterHandler={registerDeliveryHandler}
        />
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
              void clearRouteHandler();
            }}
          />
        </Modal.Actions>
      </Modal>
      <Divider />
      <TableComponent
        onHandlerPaginationChange={handlePaginationChange}
        setPagination={setPagination}
        pagination={pagination}
        deliveries={formData}
        setOpenMapModal={setOpenMapModal}
        onCalculateRoute={calculateRouteHandler}
      />
    </Container>
  );
};
