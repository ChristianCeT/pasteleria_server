const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
  nombre: String,

  apellido: {
    type: String,
  },

  correo: String,
});

module.exports = mongoose.model("Usuarios", UsuarioSchema);
