import mongoose from "mongoose";
const schema = mongoose.Schema;

const ventaSchema = new schema({
  usuario: { type: Schema.ObjectId, ref: "usuario", required: true },
  persona: { type: Schema.ObjectId, ref: "persona", required: true },
  tipo_comprobante: { type: String, maxlength: 20, required: true },
  serie_comprobante: { type: String, maxlength: 7 },
  num_comprobante: { type: String, maxlength: 10, required: true },
  impusto: { type: Number, required: true },
  total: { type: Number, required: true },
  detalles: [
    {
      _id: {
        type: String,
        required: true
      },
      articulo: {
        type: String,
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      },
      precio: {
        type: Number,
        required: true
      },
      descuento: {
        type: Number,
        required: true
      }
    }
  ],
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("venta", ventaSchema);
