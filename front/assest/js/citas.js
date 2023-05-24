const urlApi = "http://localhost:4000";

const tableCitas = document.querySelector("#tableCitas");

const frmCitas = document.querySelector("#frmCitas");

const fechaCitaRegistro = document.querySelector("#fechaCitaRegistro");
const descripcionCitaRegistro = document.querySelector(
  "#descripcionCitaRegistro"
);
const fechaEdit = document.querySelector("#fechaEdit");
const descripcionEdit = document.querySelector("#descripcionEdit");
const btnEditarCita = document.querySelector("#btnEditarCita");

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

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
    <td><button type="button" class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalCitas" id="btnEditar">Editar</button></td>
    <td><button type="button" class="btn btn-danger" id="btnBorrar">Borrar</button></td>
    </tr> `;

      tableCitas.innerHTML += fila;
    }
  });

frmCitas.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(urlApi + "/citas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fecha: fechaCitaRegistro.value,
      descripcion: descripcionCitaRegistro.value,
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
          text: "cita Agregada correctamente",
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
  btnEditarCita.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(urlApi + "/citas/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fecha: fechaEdit.value,
        descripcion: descripcionEdit.value,
      }),
    })
      .then((respuesta) => {
        return respuesta.json();
      })
      .then(() => {
        Swal.fire("Actualizado", "Cita Actualizada Correctamente", "success");
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
    text: "Esta Cita se eliminará de manera permanente",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(urlApi + "/citas/" + id, {
        method: "DELETE",
      })
        .then((respuesta) => {
          return respuesta.json();
        })
        .then((data) => {
          Swal.fire("Eliminado!", "Cita Eliminada correctamente", "success");
          setTimeout(() => {
            location.reload();
          }, 1500);
        });
    }
  });
});
