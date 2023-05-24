const urlApi = "http://localhost:4000";

const frmRegistro = document.querySelector("#frmRegistro");

const nombreRegistro = document.querySelector("#nombreRegistro");
const apellidoRegistro = document.querySelector("#apellidoRegistro");
const emailRegistro = document.querySelector("#emailRegistro");
const passwordRegistro = document.querySelector("#passwordRegistro");

const btnRegistar = document.querySelector("#btnRegistar");

frmRegistro.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(urlApi + "/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: nombreRegistro.value,
      apellido: apellidoRegistro.value,
      email: emailRegistro.value,
      password: passwordRegistro.value,
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
          text: "Usuario Agregado correctamente",
        });
        setTimeout(() => {
          window.location = "http://127.0.0.1:5500/front/index.html";
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
