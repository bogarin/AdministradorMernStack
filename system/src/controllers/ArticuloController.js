import Articulo from "../models/Articulo";

async function add(req, res, next) {
  if (req.body != "") {
    try {
      const reg = await Articulo.create(req.body);
      res.status(200).send({
        message: reg
      });
    } catch (e) {
      res.status(500).send({
        message: `Error al capturar: ${e}`
      });
      next(e);
    }
  }
  res.status(404).send("no hay informacion");
}

async function query(req, res, next) {
  try {
    const reg = await Articulo.findOne({
      _id: req.query._id
    }).populate("categoria", { nombre: 1 });
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
 * nombre o descripcion no importando
 * si es mayusculas o minusculas (valor, 'i')
 * indicando no aparecer la informacion
 * del campo createdAt con un 0
 * ordenando con el metodo sort de forma
 * decendente utiilizando el dato de createdAt
 * populate es para integrar la información
 * de la referencia de una coleccion de archivos a otra
 */

async function list(req, res, next) {
  try {
    let valor = await req.query.valor;
    const reg = await Articulo.find(
      {
        $or: [
          { nombre: new RegExp(valor, "i") },
          { descripcion: new RegExp(valor, "i") }
        ]
      },
      { createdAt: 0 }
    )
      .populate("categoria", { nombre: 1 })
      .sort({ createdAt: -1 });

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
    const reg = await Articulo.findByIdAndUpdate(
      { _id: req.body._id },
      {
        categoria: req.body.categoria,
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio_venta: req.body.precio_venta,
        stock: req.body.stock
      }
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
    const reg = await Articulo.findByIdAndDelete({ _id: req.body._id });
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
    const reg = await Articulo.findByIdAndUpdate(
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
    const reg = await Articulo.findByIdAndUpdate(
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
  update,
  remove,
  activate,
  deactivate
};
