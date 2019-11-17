import Venta from "../models/Venta";
import Articulo from "../models/Articulo";
async function add(req, res, next) {
  if (req.body != "") {
    try {
      const reg = await Venta.create(req.body);
      //aumentar el stock
      const detalles = req.body.detalles;
      detalles.map(articulo => {
        disminuirStock(articulo._id, articulo.cantidad);
      });
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
    const reg = await Venta.findOne({
      _id: req.query._id
    })
      .populate("usuario", { nombre: 1 })
      .populate("persona", { nombre: 1 });
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
 */

async function list(req, res, next) {
  try {
    let valor = await req.query.valor;
    const reg = await Venta.find({
      $or: [
        { num_comprobante: new RegExp(valor, "i") },
        { serie_comprobante: new RegExp(valor, "i") }
      ]
    })
      .populate("usuario", { nombre: 1 })
      .populate("persona", { nombre: 1 })
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

async function activate(req, res, next) {
  try {
    const reg = await Venta.findByIdAndUpdate(
      { _id: req.body._id },
      { estado: 1 }
    );
    //aumentar el stock
    const detalles = reg.detalles;
    detalles.map(articulo => {
      disminuirStock(articulo._id, articulo.cantidad);
    });
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
    const reg = await Venta.findByIdAndUpdate(
      { _id: req.body._id },
      { estado: 0 }
    );
    //disminuir el stock
    const detalles = reg.detalles;
    detalles.map(articulo => {
      aumentarStock(articulo._id, articulo.cantidad);
    });
    res.status(200).send({ message: reg });
  } catch (e) {
    res.status(500).send({
      message: `Error al actualizar: ${e}`
    });
    next(e);
  }
}

async function grafico12Meses(req, res, next) {
  try {
    let reg = await Venta.aggregate([
      {
        $group: {
          _id: {
            mes: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          total: { $sum: "$total" },
          numero: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": -1, "_id.mes": -1 }
      }
    ]).limit(12);
    res.status(200).json(reg);
  } catch (error) {
    res.status(500).send({
      message: "Ocurrio un error"
    });
    next(error);
  }
}
async function aumentarStock(idArticulo, cantidad) {
  let { stock } = await Articulo.findOne({ _id: idArticulo });
  let newStock = parseInt(stock) + parseInt(cantidad);
  let reg = await Articulo.findByIdAndUpdate(
    { _id: idArticulo },
    { stock: newStock }
  );
}

async function disminuirStock(idArticulo, cantidad) {
  let { stock } = await Articulo.findOne({ _id: idArticulo });
  let newStock = parseInt(stock) - parseInt(cantidad);
  let reg = await Articulo.findByIdAndUpdate(
    { _id: idArticulo },
    { stock: newStock }
  );
}
module.exports = {
  add,
  query,
  list,
  grafico12Meses,
  activate,
  deactivate
};
