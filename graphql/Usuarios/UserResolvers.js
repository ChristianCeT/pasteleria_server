const Usuario = require("../../models/Usuario");
const { crearToken } = require("../../Authentication/Authentication");

const UserResolvers = {
  Query: {
    usuarios: async (parent, args, context) => {
      try {
        const response = await Usuario.find();
        return response;
      } catch (error) {
        return error;
      }
    },
  },

  Mutation: {
    agregarUsuario: async (parent, args, context, info) => {
      const { nombre, apellido, correo, rol, password } = args.content;

      try {
        const usuarioG = new Usuario({
          nombre,
          apellido,
          correo,
          rol,
          password,
        });

        const response = await usuarioG.save();

        return response;
      } catch (error) {
        return error;
      }
    },

    loginUsuario: async (parent, args, context, info) => {
      const { nombre, password } = args.content;

      const datosUsuario = await Usuario.findOne({ nombre, password });

      if (!datosUsuario) {
        throw new Error("El usuario no existe");
      }

      return {
        token: crearToken(datosUsuario, process.env.CLAVE_SECRETA, "24h"),
      };
    },
  },
};

module.exports = {
  UserResolvers,
};
