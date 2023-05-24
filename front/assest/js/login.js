const urlApi = "http://localhost:4000";

const frmLogin = document.querySelector("#frmLogin");

const inputEmailLogin = document.querySelector("#inputEmailLogin");
const inputPasswordLogin = document.querySelector("#inputPasswordLogin");
const btnIngresar = document.querySelector("#btnIngresar");

frmLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(urlApi + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: inputEmailLogin.value,
      password: inputPasswordLogin.value,
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
          text: "Ingreso correctamente!",
        });
        setTimeout(() => {
          window.location = "http://127.0.0.1:5500/front/dashboard/index.html";
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
