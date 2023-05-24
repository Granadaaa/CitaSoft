const express = require("express");
const app = express(); //creamos nuestra aplicacion llamando el metodo constructor de express

app.use("/", require("./modules/citas"));
app.use("/", require("./modules/usuarios"));
app.use("/", require("./modules/contactos"));

app.listen("4000", () => {
  console.log("Aplicacion ejecutandose en : http://localhost:4000");
});
