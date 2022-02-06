const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
  nombre: String,

  apellido: {
    type: String,
  },

  password: String,

  correo: String,

  rol: String,
});

module.exports = mongoose.model("Usuarios", UsuarioSchema);
