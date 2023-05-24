const mysql = require("mysql");

//Creamos la conexion
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "agenda",
});

//Nos conectamos a la base de datos

conexion.connect((error) => {
  if (error) {
    // throw "Existe un error en la cadena de conexion!";
    console.log(`Hay un error:${error}`);
  } else {
    console.log("Conexion Existosa");
  }
});

//exporta el modulo para usarlo en otros modulos principio srp single-responsability principle
module.exports = conexion;
