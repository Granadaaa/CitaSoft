const urlApi = "http://localhost:4000";

const tableContactos = document.querySelector("#tableContactos");

const frmContacto = document.querySelector("#frmContacto");

const nombreConRe = document.querySelector("#nombreConRe");
const apellido1ConRe = document.querySelector("#apellido1ConRe");
const apellido2ConRe = document.querySelector("#apellido2ConRe");
const telefonoConRe = document.querySelector("#telefonoConRe");
const emailConRe = document.querySelector("#emailConRe");
const fechaNaceConRe = document.querySelector("#fechaNaceConRe");
const btnEditarContacto = document.querySelector("#btnEditarContacto");

const nombreEdit = document.querySelector("#nombreEdit");
const apellido1Edit = document.querySelector("#apellido1Edit");
const apellido2Edit = document.querySelector("#apellido2Edit");
const telefonoEdit = document.querySelector("#telefonoEdit");
const emailEdit = document.querySelector("#emailEdit");
const fechaEdit = document.querySelector("#fechaEdit");

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

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
    <td><button type="button" class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalContactos" id="btnEditar">Editar</button></td>
    <td><button type="button" class="btn btn-danger" id="btnBorrar">Borrar</button></td>
    </tr> `;

      tableContactos.innerHTML += fila;
    }
  });

frmContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(urlApi + "/contactos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: nombreConRe.value,
      apellido1: apellido1ConRe.value,
      apellido2: apellido2ConRe.value,
      telefono: telefonoConRe.value,
      email: emailConRe.value,
      fechaNacimiento: fechaNaceConRe.value,
    }),
  })
    .then((respuesta) => {
      return respuesta.text();
    })
    .then((respuesta) => {
      if (respuesta == "true") {
        Swal.fire({
          icon: "success",
          title: "Felicitaciones!",
          text: "Contacto Agregado correctamente",
        });
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en la validacion",
          text: "Debe llenar todos los campos",
        });
      }
    });
});

on(document, "click", "#btnEditar", (e) => {
  let fila = e.target.parentNode.parentNode;
  const id = fila.firstElementChild.innerHTML;
  btnEditarContacto.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(urlApi + "/contactos/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nombreEdit.value,
        apellido1: apellido1Edit.value,
        apellido2: apellido2Edit.value,
        telefono: telefonoEdit.value,
        email: emailEdit.value,
        fechaNacimiento: fechaEdit.value,
      }),
    })
      .then((respuesta) => {
        return respuesta.json();
      })
      .then(() => {
        Swal.fire(
          "Actualizado",
          "Contacto Actualizado correctamente",
          "success"
        );
        setTimeout(() => {
          location.reload();
        }, 1500);
      });
  });
});

on(document, "click", "#btnBorrar", (e) => {
  let fila = e.target.parentNode.parentNode;
  const id = fila.firstElementChild.innerHTML;
  Swal.fire({
    title: "Estas seguro?",
    text: "Este Contacto se eliminará de manera permanente",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(urlApi + "/contactos/" + id, {
        method: "DELETE",
      })
        .then((respuesta) => {
          return respuesta.json();
        })
        .then((data) => {
          Swal.fire(
            "Eliminado!",
            "Contacto Eliminado correctamente",
            "success"
          );
          setTimeout(() => {
            location.reload();
          }, 1500);
        });
    }
  });
});
