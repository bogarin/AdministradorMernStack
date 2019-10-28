import Usuario from "../models/Usuario";
import bcrypt from "bcryptjs";
import helpers from "../helpers";
import token from "../services/token";

async function add(req, res, next) {
  if (req.body.nombre != undefined) {
    return await helpers.UserHelpers.addUserList(Usuario, bcrypt, req)
      .then(reg => {
         res.status(200).send({ message: reg });
      })
      .catch(e => {
        res.status(500).send({ message: `Error al capturar: ${e}` });
        next(e);
      });
  }
  res.status(404).send({ mesage: "no hay informacion" });
}

async function query(req, res, next) {
  try {
    const reg = await Usuario.findOne({
      _id: req.query._id
    });
    if (!reg) {
      res.status(404).send({
        message: "El registro no existe"
      });
    }
    res.status(200).send({
      message: reg
    });
  } catch (e) {
    res.status(500).send({
      message: `Error al consultar: ${e}`
    });
    next(e);
  }
}

/*
 * en el metodo find esta asiendo busqueda
 * utilizando la instrucción or escogiendo con
 * RegExp (semejante a la instruccion like)
 * indicando si el valor se encuentra en
 * nombre o email no importando
 * si es mayusculas o minusculas (valor, 'i')
 * indicando no aparecer la informacion
 * del campo createdAt con un 0
 * ordenando con el metodo sort de forma
 * decendente utiilizando el dato de createdAt
 */

async function list(req, res, next) {
  try {
    let valor = await req.query.valor;
    const reg = await Usuario.find(
      {
        $or: [
          { nombre: new RegExp(valor, "i") },
          { email: new RegExp(valor, "i") }
        ]
      },
      { createdAt: 0 }
    ).sort({ createdAt: -1 });
    res.status(200).send({
      message: reg
    });
  } catch (e) {
    res.status(500).send({
      message: `Error al consutar: ${e}`
    });
    next(e);
  }
}

async function update(req, res, next) {
  try {
    let oldpwd = await Usuario.findOne({ _id: req.body._id });
    const reg = await Usuario.findByIdAndUpdate(
      { _id: req.body._id },
      helpers.UserHelpers.CompareToPwdAndUpdateUser(req.body, oldpwd)
    );
    res.status(200).send({ message: reg });
  } catch (e) {
    res.status(500).send({
      message: `Error al actualizar: ${e}`
    });
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    const reg = await Usuario.findByIdAndDelete({ _id: req.body._id });
    res.status(200).send({ message: reg });
  } catch (e) {
    res.status(500).send({
      message: `Error al remover: ${e}`
    });
    next(e);
  }
}

async function activate(req, res, next) {
  try {
    const reg = await Usuario.findByIdAndUpdate(
      { _id: req.body._id },
      { estado: 1 }
    );
    res.status(200).send({ message: reg });
  } catch (e) {
    res.status(500).send({
      message: `Error al actualizar: ${e}`
    });
    next(e);
  }
}

async function deactivate(req, res, next) {
  try {
    const reg = await Usuario.findByIdAndUpdate(
      { _id: req.body._id },
      { estado: 0 }
    );
    res.status(200).send({ message: reg });
  } catch (e) {
    res.status(500).send({
      message: `Error al actualizar: ${e}`
    });
    next(e);
  }
}

async function login(req, res, next) {
  try {
    let matchUser = await helpers.UserHelpers.validateUserEmail(
      req,
      Usuario,
      bcrypt
    );
    if (matchUser == -1) {
      res.status(404).send({ message: "No existe el usuario" });
    }
    if (!matchUser) {
      res.status(404).send({ message: "contraseña incorrecta" });
    }

    let tokenReturn = await token.encode(matchUser._id);
    res.json({ matchUser, tokenReturn });
  } catch (err) {
    res.status(500).send({
      message: `Èrror en la consulta usuario: ${err}`
    });
    next(err);
  }
}

module.exports = {
  add,
  login,
  query,
  list,
  update,
  remove,
  activate,
  deactivate
};
