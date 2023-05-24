const express = require("express");
const cors = require("cors"); //para evitar restricciones entre llamadas de sitios
const usuario = express.Router(); //trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clietes
const conex = require("./bdatos");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { error, log } = require("console");

usuario.use(express.json());
usuario.use(cors());
usuario.options("*", cors());

//verbo GET listar

usuario.get("/usuarios", async (req, res) => {
  try {
    conex.query("select * from usuario", (error, respuesta) => {
      //console.log(respuesta);
      res.send(respuesta);
    });
  } catch (error) {
    //throw error;
    console.log(error);
  }
});

//verbo POST insertar

usuario.post("/usuarios", async (req, res) => {
  try {
    let data = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 7),
    };

    conex.query("insert into usuario set ?", [data], (error, respuesta) => {
      res.send(true);
      //res.sendStatus(200);
    });
  } catch (error) {
    console.log(error);
    res.send(false);
    //res.send.status(404).error;
  }
});

//verbo PUt Editar

usuario.put("/usuarios/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let datos = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 7),
    };
    conex.query(
      "update usuario set ? where id = ?",
      [datos, id],
      (error, respuesta) => {
        res.send(true);
      }
    );
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

//verbo DELETE eliminar

usuario.delete("/usuarios/:id", async (req, res) => {
  try {
    let id = req.params.id;
    conex.query("delete from usuario where id = ?", id, (error, respuesta) => {
      res.send(true);
    });
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

//Login de usuario

usuario.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    //validamos que lleguen los datos completos
    if (!email || !password) {
      console.log("Debe enviar los datos completos");
    } else {
      conex.query(
        "select * from usuario where email = ?",
        [email],
        async (error, respuesta) => {
          if (
            respuesta.length == 0 ||
            !(await bcrypt.compare(password, respuesta[0].password))
          ) {
            res.send(false);
          } else {
            res.send(true);
          }
        }
      );
    }
  } catch (error) {
    console.log("hay un error en la conexion con el servidor");
  }
});

module.exports = usuario;
