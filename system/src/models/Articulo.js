import mongoose from "mongoose";
const schema = mongoose.Schema;

const articuloSchema = new schema({
  categoria: { type: schema.ObjectId, ref: "categoria" },
  codigo: { type: String, maxlength: 64 },
  nombre: { type: String, maxlength: 50, unique: true, reequired: true },
  descripcion: { type: String, maxlength: 255 },
  precio_venta: { type: Number, required: true },
  stock: { type: Number, required: true },
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("articulo", articuloSchema);
