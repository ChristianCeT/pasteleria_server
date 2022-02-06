const { gql } = require("apollo-server-express");

const UsertypeDefs = gql`
  #types
  type Usuario {
    _id: String
    nombre: String
    apellido: String
    correo: String
    rol: String
  }

  type Token {
    token: String
  }

  #enum
  enum Rol {
    ADMIN
    USUARIO
  }

  input UsuarioContent {
    nombre: String
    password: String
    apellido: String
    correo: String
    rol: Rol
  }

  input Login {
    nombre: String
    password: String
  }

  #Queries
  type Query {
    usuarios: [Usuario]
  }

  type Mutation {
    agregarUsuario(content: UsuarioContent): Usuario
    loginUsuario(content: Login): Token
  }
`;

module.exports = {
  UsertypeDefs,
};
