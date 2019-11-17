import Ingreso from "../models/Ingreso";
import Articulo from "../models/Articulo";
async function add(req, res, next) {
  if (req.body != "") {
    try {
      const reg = await Ingreso.create(req.body);
      //aumentar el stock
      const detalles = req.body.detalles;
      detalles.map(articulo => {
        aumentarStock(articulo._id, articulo.cantidad);
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
    const reg = await Ingreso.findOne({
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
    const reg = await Ingreso.find(
      {
        $or: [
          { num_comprobante: new RegExp(valor, "i") },
          { serie_comprobante: new RegExp(valor, "i") }
        ]
      },
      { createdAt: 0 }
    )
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

// async function update(req, res, next) {
//   try {
//     const reg = await Ingreso.findByIdAndUpdate(
//       { _id: req.body._id },
//       {
//         nombre: req.body.nombre,
//         descripcion: req.body.descripcion
//       }
//     );
//     res.status(200).send({ message: reg });
//   } catch (e) {
//     res.status(500).send({
//       message: `Error al actualizar: ${e}`
//     });
//     next(e);
//   }
// }

// async function remove(req, res, next) {
//   try {
//     const reg = await Ingreso.findByIdAndDelete({ _id: req.body._id });
//     res.status(200).send({ message: reg });
//   } catch (e) {
//     res.status(500).send({
//       message: `Error al remover: ${e}`
//     });
//     next(e);
//   }
// }

async function activate(req, res, next) {
  try {
    const reg = await Ingreso.findByIdAndUpdate(
      { _id: req.body._id },
      { estado: 1 }
    );
    //aumentar el stock
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

async function deactivate(req, res, next) {
  try {
    const reg = await Ingreso.findByIdAndUpdate(
      { _id: req.body._id },
      { estado: 0 }
    );
    //disminuir el stock
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
  // update,
  // remove,
  activate,
  deactivate
};
