const urlBase = import.meta.env.VITE_BACKEND_URL
  
export function crearURLCompleta(rutaImagen) {
  const tieneProtocolo = rutaImagen.startsWith("http://");

  if (!tieneProtocolo) {
    return urlBase + rutaImagen;
  } else {
    return rutaImagen;
  }
}