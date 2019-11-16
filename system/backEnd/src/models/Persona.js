import mongoose from "mongoose";
const schema = mongoose.Schema;

const PersonaSchema =new schema({
    tipo_persona: { type: String, maxlength: 20 },
    nombre: { type: String, maxlength: 50, required: true, unique: true },
    tipo_documento: { type: String, maxlength: 20 },
    num_documento: { type: String, maxlength: 20 },
    direccion: { type: String, maxlength: 70 },
    telefono: { type: String, maxlength: 20 },
    email: { type: String, maxlength: 50, unique: true },
    estado: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
  });
  module.exports = mongoose.model("persona", PersonaSchema);
