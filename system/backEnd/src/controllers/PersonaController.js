import Persona from "../models/Persona";
import helpers from "../helpers";

async function add(req, res, next) {
  if (req.body.nombre != undefined) {
    return await Persona.create(req.body)
      .then(reg => {
        res.status(200).send({ message: reg });
      })
      .catch(e => {
        res.status(500).send({ message: `Error al capturar: ${e}` });
        next(e);
      });
  }
  console.log(req.body);
  res.status(404).send({ mesage: "no hay informacion" });
}

async function query(req, res, next) {
  try {
    const reg = await Persona.findOne({
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
    const reg = await Persona.find(
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

async function listClientes(req, res, next) {
  try {
    let valor = await req.query.valor;
    const reg = await Persona.find(
      {
        $or: [
          { nombre: new RegExp(valor, "i") },
          { email: new RegExp(valor, "i") }
        ],
        tipo_persona: "cliente"
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

async function listProveedores(req, res, next) {
  try {
    let valor = await req.query.valor;
    const reg = await Persona.find(
      {
        $or: [
          { nombre: new RegExp(valor, "i") },
          { email: new RegExp(valor, "i") }
        ],
        tipo_persona: "proveedor"
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
    const reg = await Persona.findByIdAndUpdate(
      { _id: req.body._id },
      helpers.PersonaHelpers.UpdatePersona
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
    const reg = await Persona.findByIdAndDelete({ _id: req.body._id });
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
    const reg = await Persona.findByIdAndUpdate(
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
    const reg = await Persona.findByIdAndUpdate(
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

module.exports = {
  add,
  query,
  list,
  listClientes,
  listProveedores,
  update,
  remove,
  activate,
  deactivate
};
