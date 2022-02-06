const jwt = require("jsonwebtoken");

const getUsers = (token) => {
   
  try {
    const usuario = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.CLAVE_SECRETA
    );
    return usuario;
  } catch (error) {
    console.log("ERROR", error);
    return error.message;
  }
};

const crearToken = (usuario, clave, expiresIn) => {
  const { nombre, correo, password, rol } = usuario;

  const token = jwt.sign({ nombre, correo, password, rol }, clave, {
    expiresIn,
  });

  return token;
};

module.exports = {
  getUsers,
  crearToken,
};
