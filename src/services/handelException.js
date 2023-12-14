import Swal from "sweetalert2";
import { toast } from "react-toastify";
async function handelExceptions(error) {
  if (error.response && error.response.data.message === "Access Denied") {
    Swal.fire({
      icon: "warning",
      title: "Account problem!",
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: false,
      denyButtonText: `Log in again!`,
    }).then((result) => {
      if (result.isDenied) {
        localStorage.clear();
        window.location.href = "/";
      }
    });
  } else if (
    error.response &&
    error.response.data.message === "Range [7, 6) out of bounds for length 6"
  ) {
    Swal.fire({
      icon: "warning",
      title: "Account problem!",
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: false,
      denyButtonText: `Log in again!`,
    }).then((result) => {
      if (result.isDenied) {
        localStorage.clear();
        window.location.href = "/";
      }
    });
  } else if (
    error.response &&
    error.response.data.message ===
      "Account doesn't exits or incorrect password"
  ) {
    Swal.fire({
      icon: "warning",
      title: error.response.data.message,
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: false,
      denyButtonText: `Log in again!`,
    }).then((result) => {
      if (result.isDenied) {
        localStorage.clear();
      }
    });
  } else if (error.code === "ERR_CANCELED") {
    Swal.fire({
      icon: "warning",
      title: "The login session has expired or does not exist",
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: false,
      denyButtonText: `Log in again!`,
    }).then((result) => {
      if (result.isDenied) {
        localStorage.clear();
        window.location.href = "/";
      }
    });
  } else if (
    error.response &&
    error.response.data.result === "Account does not exist"
  ) {
    Swal.fire({
      icon: "info",
      title: error.response.data.result,
      showDenyButton: false,
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: `OK`,
    }).then((result) => {
      if (result.isDenied) {
        localStorage.clear();
      }
    });
  } else {
    console.log(error);
    Swal.fire("Failed", "Please try again!", "error");
  }
}

async function handelNotificationSwal(message, icon) {
  Swal.fire({
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

async function handelNotificationToastInfo(message) {
  toast.info(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1500,
  });
}
async function handelNotificationToastError(message) {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1500,
  });
}
async function handelNotificationToastSuccess(message) {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1500,
  });
}
async function handelNotificationToastWarning(message) {
  toast.warning(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1500,
  });
}

export const handelException = {
  handelExceptions,
  handelNotificationSwal,
  handelNotificationToastInfo,
  handelNotificationToastError,
  handelNotificationToastSuccess,
  handelNotificationToastWarning,
};
