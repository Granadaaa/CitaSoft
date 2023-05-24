const express = require("express");
const cors = require("cors"); //para evitar restricciones entre llamadas de sitios
const contacto = express.Router(); //trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clietes
const conex = require("./bdatos");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { error, log } = require("console");

contacto.use(express.json());
contacto.use(cors());
contacto.options("*", cors());

//verbo GET listar

contacto.get("/contactos", async (req, res) => {
  try {
    conex.query("select * from contacto", (error, respuesta) => {
      //console.log(respuesta);
      res.send(respuesta);
    });
  } catch (error) {
    //throw error;
    console.log(error);
  }
});

//verbo POST insertar

contacto.post("/contactos", async (req, res) => {
  try {
    let data = {
      nombre: req.body.nombre,
      apellido1: req.body.apellido1,
      apellido2: req.body.apellido2,
      telefono: req.body.telefono,
      email: req.body.email,
      fechaNacimiento: req.body.fechaNacimiento,
    };

    conex.query("insert into contacto set ?", [data], (error, respuesta) => {
      res.send(true);
      //res.sendStatus(200);
    });
  } catch (error) {
    console.log(error);
    res.send(false);
    //res.send.status(404).error;
  }
});

//verbo PUT editar

contacto.put("/contactos/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let datos = {
      nombre: req.body.nombre,
      apellido1: req.body.apellido1,
      apellido2: req.body.apellido2,
      telefono: req.body.telefono,
      email: req.body.email,
      fechaNacimiento: req.body.fechaNacimiento,
    };
    conex.query(
      "update contacto set ? where id = ?",
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

contacto.delete("/contactos/:id", async (req, res) => {
  try {
    let id = req.params.id;
    conex.query("delete from contacto where id = ?", id, (error, respuesta) => {
      res.send(true);
    });
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

module.exports = contacto;
