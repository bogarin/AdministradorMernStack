import mongoose from "mongoose";
const schema = mongoose.Schema;

const categoriaSchema = new schema({
  nombre: { type: String, maxlength: 50, unique: true, required: true },
  descripcion: { type: String, maxlength: 255 },
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("categoria", categoriaSchema);
