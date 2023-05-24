const urlApi = "http://localhost:4000";

const tableContactos = document.querySelector("#tableContactos");
const tableCitas = document.querySelector("#tableCitas");

fetch(urlApi + "/contactos")
  .then((respuesta) => {
    return respuesta.json();
  })
  .then((data) => {
    for (let index = 0; index < data.length; index++) {
      let fechaAct = data[index].fechaNacimiento;
      let fechaFinal = fechaAct.split("T");

      let fila = ` <tr>
    <td>${data[index].id}</td>
    <td>${data[index].nombre}</td>
    <td>${data[index].apellido1}</td>
    <td>${data[index].apellido2}</td>
    <td>${data[index].telefono}</td>
    <td>${data[index].email}</td>
    <td>${fechaFinal[0]}</td>
    </tr> `;

      tableContactos.innerHTML += fila;
    }
  });

fetch(urlApi + "/citas")
  .then((respuesta) => {
    return respuesta.json();
  })
  .then((data) => {
    for (let index = 0; index < data.length; index++) {
      let fechaAct = data[index].fecha;
      let fechaFinal = fechaAct.split("T");

      let fila = ` <tr>
    <td>${data[index].id}</td>
    <td>${fechaFinal[0]}</td>
    <td>${data[index].descripcion}</td>
    </tr> `;

      tableCitas.innerHTML += fila;
    }
  });
