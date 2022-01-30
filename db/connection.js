const mongoose = require("mongoose");

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log(`BASE DE DATOS CONECTADA EN EL PUERTO ${mongoose.connection.port}`);
    
  } catch (error) {
    return error;
  }
};

module.exports = {
  connectionDB,
};
