import { store } from "react-notifications-component";

const notification = {
  insert: "top",
  container: "bottom-left",
  animationIn: ["animate__animated", "animate__fadeIn"],
  animationOut: ["animate__animated", "animate__fadeOut"],
  dismiss: {
    duration: 3000,
    onScreen: true,
  },
};

const Success = ({
  title,
  message,
  container = "bottom-left",
  duration = 2000,
}) => {
  store.addNotification({
    ...notification,
    title: title,
    message: message,
    type: "success",
    container,
    dismiss: {
      duration,
      onScreen: true,
    },
  });
};

const Error = ({
  title,
  message,
  container = "bottom-left",
  duration = 3000,
}) => {
  store.addNotification({
    ...notification,
    title: title,
    message: message,
    type: "danger",
    container,
    dismiss: {
      duration,
      onScreen: true,
    },
  });
};

const Info = ({
  title,
  message,
  container = "bottom-left",
  duration = 3000,
}) => {
  store.addNotification({
    ...notification,
    title: title,
    message: message,
    type: "info",
    container,
    dismiss: {
      duration,
      onScreen: true,
    },
  });
};

const Warning = ({
  title,
  message,
  container = "bottom-left",
  duration = 3000,
}) => {
  store.addNotification({
    ...notification,
    title: title,
    message: message,
    type: "warning",
    container,
    dismiss: {
      duration,
      onScreen: true,
    },
  });
};

const Default = ({
  title,
  message,
  container = "bottom-left",
  duration = 3000,
}) => {
  store.addNotification({
    ...notification,
    title: title,
    message: message,
    type: "default",
    container,
    dismiss: {
      duration,
      onScreen: true,
    },
  });
};

const useNotification = {
  Success,
  Error,
  Info,
  Warning,
  Default,
};

export default useNotification;
