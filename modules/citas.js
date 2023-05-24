const express = require("express");
const cors = require("cors"); //para evitar restricciones entre llamadas de sitios
const cita = express.Router(); //trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clietes
const conex = require("./bdatos");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { error, log } = require("console");

cita.use(express.json());
cita.use(cors());
cita.options("*", cors());

//Verbo GET listar

cita.get("/citas", async (req, res) => {
  try {
    conex.query("select * from cita", (error, respuesta) => {
      //console.log(respuesta);
      res.send(respuesta);
    });
  } catch (error) {
    //throw error;
    console.log(error);
  }
});

//verbo POST insertar

cita.post("/citas", async (req, res) => {
  try {
    let data = {
      fecha: req.body.fecha,
      descripcion: req.body.descripcion,
    };

    conex.query("insert into cita set ?", [data], (error, respuesta) => {
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

cita.put("/citas/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let datos = {
      fecha: req.body.fecha,
      descripcion: req.body.descripcion,
    };
    conex.query(
      "update cita set ? where id = ?",
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

cita.delete("/citas/:id", async (req, res) => {
  try {
    let id = req.params.id;
    conex.query("delete from cita where id = ?", id, (error, respuesta) => {
      res.send(true);
    });
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

//verbo DELETE eliminar

module.exports = cita;
