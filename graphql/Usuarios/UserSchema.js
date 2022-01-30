const { gql } = require("apollo-server-express");

const UsertypeDefs = gql`
  #types
  type Usuario {
    _id: String
    nombre: String
    apellido: String
    correo: String
  }

  input UsuarioContent {
    nombre: String
    apellido: String
    correo: String
  } 

  #Queries
  type Query {
    usuarios: [Usuario]
  }

  type Mutation {
    agregarUsuario(content: UsuarioContent): Usuario
  }
`;

module.exports = {
  UsertypeDefs,
};
