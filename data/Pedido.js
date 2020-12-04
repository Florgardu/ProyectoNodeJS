const ObjectId = require("mongodb").ObjectId;
const { Connection } = require("../data/mongo-connection");
const chalk = require("chalk");

async function getAll() {
   const pedidos = await Connection.db.db("ejemplo_tp2").collection("pedidos").find().toArray();
   return pedidos;
}

async function create(pedido) {
    pedido.idCustomer = new ObjectId(pedido.idCustomer);
   const resultado = await Connection.db.db("ejemplo_tp2").collection("pedidos").insertOne(pedido);
   return resultado;
}

async function removeById(id) {
   const result = await Connection.db
      .db("ejemplo_tp2")
      .collection("pedidos")
      .deleteOne({ _id: new ObjectId(id) });
   if (result.deletedCount != 1) {
      throw new Error("No se elimino el pedido");
   }
   return id;
}

async function getById(id) {
   const idPorParametro = new ObjectId(id);
   const pedido = await Connection.db.db("ejemplo_tp2").collection("pedidos").findOne({ _id: idPorParametro });
   return pedido;
}

async function getByUserId(userId) {
   const idPorParametro = new ObjectId(userId);
   const pedidos = await Connection.db.db("ejemplo_tp2").collection("pedidos").find({ idCustomer: idPorParametro }).toArray();
   return pedidos;
}

module.exports = { getAll, create, getByUserId, removeById, getById };
