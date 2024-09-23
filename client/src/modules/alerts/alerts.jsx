import Swal from 'sweetalert2'

const toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  // timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
  }
});

export const alertMessage = (title, icon="", time=3) => {
  toast.fire({
    icon,
    title,
    timer: time*1000,
  })
}