import Swal from 'sweetalert2'

export const alertBasic = (title, text, icon) => {
  Swal.fire({
    title,
    text,
    icon
  });
}

export const alertMessage = (title, icon="", time=3) => {
  Swal.fire({
    icon,
    title,
    timer: time*1000,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
  })
}

export const alertAreYouSure = (action) => {
  Swal.fire({
    title: "¿Estas seguro?",
    text: "Este cambio es irreversible",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si. Hazlo",
    cancelButtonText: "Lo pensare",
  }).then((result) => {
    if (result.isConfirmed) {
      action && action()
      Swal.fire({
        title: "¡Eliminado!",
        icon: "success"
      });
    }
  });
}

