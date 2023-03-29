export default function validarCrearCuenta(valores) {
  let errores = {};

  if (!valores.nombre) {
    errores.nombre = "El Nombre es obligatorio";
  }

  if (!valores.empresa) {
    errores.empresa = "Nombre de Empresa obligatorio";
  }

  if (!valores.url) {
    errores.url = "La URL del producto es obligatoria";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "URL  no válida";
  }

  if (!valores.descripcion) {
    errores.descripcion = "Agregar descripción de tu producto";
  }

  return errores;
}
