import mongoose from "mongoose";
const schema = mongoose.Schema;
const usuarioSchema = schema({
  rol: { type: String, maxlength: 30, required: true },
  nombre: { type: String, maxlength: 50, required: true, unique: true },
  topo_documento: { type: String, maxlength: 20 },
  num_documento: { type: String, maxlength: 20 },
  direccion: { type: String, maxlength: 70 },
  telefono: { type: String, maxlength: 20 },
  email: { type: String, maxlength: 50, unique: true, required: true },
  password: { type: String, maxlength: 64, required: true },
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("usuario", usuarioSchema);
