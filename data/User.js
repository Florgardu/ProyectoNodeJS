const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs");
const { Connection } = require("../data/mongo-connection");

async function create(user) {
   if (!user.hasOwnProperty("username") || !user.hasOwnProperty("email") || !user.hasOwnProperty("password"))
      throw "Campos faltantes";
   user.password = await encriptarPassword(user.password);
   const resultado = await Connection.db.db("ejemplo_tp2").collection("users").insertOne(user);
   return resultado;
}

async function getById(id) {
   id = new ObjectId(id);
   const resultado = await Connection.db.db("ejemplo_tp2").collection("users").findOne({ _id: id });
   return resultado;
}

async function getByEmail(email) {
   const resultado = await Connection.db.db("ejemplo_tp2").collection("users").findOne({ email: email });
   return resultado;
}

async function encriptarPassword(password) {
   const salt = await bcrypt.genSalt(10);
   return bcrypt.hash(password, salt);
}

async function validarPasswordBcrypt(email, password) {
   userDB = await getByEmail(email);
   return await bcrypt.compare(password, userDB.password);
}

module.exports = { create, getById, getByEmail, validarPasswordBcrypt };
