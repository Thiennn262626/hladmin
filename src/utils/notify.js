import Swal from "sweetalert2";
import { toast } from 'react-toastify';

async function notify1(title, icon, denyButtonText) {
  Swal.fire({
    icon: icon,
    title: title,
    showDenyButton: true,
    showConfirmButton: false,
    showCancelButton: false,
    denyButtonText: denyButtonText || `Try again!`,
    denyButtonColor: "#1967D2",
  }).then((result) => {
    if (result.isDenied) {
      return true;
    }
  });
}
//icon = 'warning', 'error', 'success', 'info', 'question'
async function notify2(title, icon, text, confirmButtonText, cancelButtonText) {
  return new Promise((resolve) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#1967D2",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText || "Yes",
      cancelButtonText: cancelButtonText || "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

async function handelNotificationSwal(message, icon) {
  Swal.fire({
    icon: icon,
    text: message,
    showConfirmButton: false,
    timer: 1500,
  });
}
async function showNotification(title, body, link, autoCloseDelayInSeconds) {
  // Kiểm tra xem trình duyệt có hỗ trợ API Notification không
  if ('Notification' in window) {
    // Yêu cầu quyền hiển thị thông báo
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        // Tạo đối tượng thông báo với các thuộc tính tùy chỉnh
        const options = {
          body,
          icon: '/images/logohub.png',
          requireInteraction: true,
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: "vibration-sample",
          dir: "ltr", // Thiết lập hướng văn bản là từ trái sang phải
          badge: '/images/badge.png', // Icon hiển thị góc trái
          // sound: '/sound/notification.mp3',
        };

        // Hiển thị thông báo
        const notification = new Notification(title, options);

        // Đặt thời gian tự động đóng
        setTimeout(() => {
          notification.close();
          //xóa bỏ thông báo sau khi đóng
        }, autoCloseDelayInSeconds * 1000); // Chuyển đổi thời gian từ giây sang mili giây

        // Xử lý sự kiện khi thông báo được nhấp vào
        notification.onclick = function (event) {
          // Thực hiện hành động khi thông báo được nhấp vào
          handleNotificationAction(link);
          event.preventDefault();
        }; 
      }
      else {
        // Xử lý khi quyền hiển thị thông báo bị từ chối
        console.log("Notification permission denied");
      }
    });
  }
}

// Hàm xử lý hành động của thông báo
function handleNotificationAction(clickAction) {
  // Thực hiện hành động mong muốn, ví dụ: mở một liên kết
  // mở liên kết mới

  window.location.href = clickAction;
}

// Hàm xử lý hành động của thông báo
async function messageNotify(payload) {
  toast.info(payload.notification.title + " has sent you a new message", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: false,
  });
  // const notificationSound = new Audio('/sound/notification.mp3');
  // // Sử dụng đối tượng Audio đã được tạo sẵn
  // if (notificationSound) {
  //   await notificationSound.play().catch(error => console.error("Error playing audio:", error));
  // }


}

export const notify = {
  handelNotificationSwal,
  notify1,
  notify2,
  showNotification,
  messageNotify
};
