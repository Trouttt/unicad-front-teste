import { validateText } from "../utils/validateForm-utils";

interface formState {
  name_value: string;
  date_value: string;
  origin_value: string;
  destination_value: string;

  name_isValid: boolean;
  date_isValid: boolean;
  origin_isValid: boolean;
  destination_isValid: boolean;

  form_isValid: boolean;
}

interface formAction {
  type: string;
  val: string;
}

const registerDeliveryFormReducer = (
  state: formState,
  action: formAction
): formState => {
  switch (action.type) {
    case "NAME_INPUT":
      return {
        name_value: action.val,
        name_isValid: validateText(action.val),
        date_value: state.date_value,
        date_isValid: state.date_isValid,
        origin_value: state.origin_value,
        origin_isValid: state.origin_isValid,
        destination_value: state.destination_value,
        destination_isValid: state.destination_isValid,
        form_isValid: state.form_isValid,
      };

    case "NAME_BLUR":
      return {
        name_value: state.name_value,
        name_isValid: validateText(state.name_value),
        date_value: state.date_value,
        date_isValid: state.date_isValid,
        origin_value: state.origin_value,
        origin_isValid: state.origin_isValid,
        destination_value: state.destination_value,
        destination_isValid: state.destination_isValid,
        form_isValid: state.form_isValid,
      };

    case "DATE_INPUT":
      return {
        name_value: state.name_value,
        name_isValid: state.name_isValid,
        date_value: action.val,
        date_isValid: validateText(action.val),
        origin_value: state.origin_value,
        origin_isValid: state.origin_isValid,
        destination_value: state.destination_value,
        destination_isValid: state.destination_isValid,
        form_isValid: state.form_isValid,
      };

    case "DATE_BLUR":
      return {
        name_value: state.name_value,
        name_isValid: state.name_isValid,
        date_value: state.date_value,
        date_isValid: !!state.date_isValid,
        origin_value: state.origin_value,
        origin_isValid: state.origin_isValid,
        destination_value: state.destination_value,
        destination_isValid: state.destination_isValid,
        form_isValid: state.form_isValid,
      };
    case "ORIGIN_INPUT":
      return {
        name_value: state.name_value,
        name_isValid: state.name_isValid,
        date_value: state.date_value,
        date_isValid: state.date_isValid,
        origin_value: action.val,
        origin_isValid: validateText(action.val),
        destination_value: state.destination_value,
        destination_isValid: state.destination_isValid,
        form_isValid: state.form_isValid,
      };
    case "ORIGIN_BLUR":
      return {
        name_value: state.name_value,
        name_isValid: state.name_isValid,
        date_value: state.date_value,
        date_isValid: state.date_isValid,
        origin_value: state.origin_value,
        origin_isValid: validateText(state.origin_value),
        destination_value: state.destination_value,
        destination_isValid: state.destination_isValid,
        form_isValid: state.form_isValid,
      };
    case "DESTINATION_INPUT":
      return {
        name_value: state.name_value,
        name_isValid: state.name_isValid,
        date_value: state.date_value,
        date_isValid: state.date_isValid,
        origin_value: state.origin_value,
        origin_isValid: state.origin_isValid,
        destination_value: action.val,
        destination_isValid: validateText(action.val),
        form_isValid: state.form_isValid,
      };
    case "DESTINATION_BLUR":
      return {
        name_value: state.name_value,
        name_isValid: state.name_isValid,
        date_value: state.date_value,
        date_isValid: state.date_isValid,
        origin_value: state.origin_value,
        origin_isValid: state.origin_isValid,
        destination_value: state.destination_value,
        destination_isValid: validateText(state.destination_value),
        form_isValid: state.form_isValid,
      };
    default:
      return {
        name_value: "",
        name_isValid: false,
        date_value: "",
        date_isValid: false,
        origin_value: "",
        origin_isValid: false,
        destination_value: "",
        destination_isValid: false,
        form_isValid: false,
      };
  }
};

export default registerDeliveryFormReducer;
