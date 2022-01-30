const Usuario = require("../../models/Usuario");

const UserResolvers = {
  Query: {
    usuarios: async () => {
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
      const { nombre, apellido, correo } = args.content;

      try {
        const usuarioG = new Usuario({
          nombre,
          apellido,
          correo,
        });

        const response = await usuarioG.save();

        return response;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = {
  UserResolvers,
};
