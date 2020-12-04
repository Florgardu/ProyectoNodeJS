const ObjectId = require("mongodb").ObjectId;
const { Connection } = require("../data/mongo-connection");
const chalk = require("chalk");

async function getAll() {
   const products = await Connection.db.db("ejemplo_tp2").collection("products").find().toArray();
   return products;
}

async function create(product) {
   const resultado = await Connection.db.db("ejemplo_tp2").collection("products").insertOne(product);
   return resultado;
}

async function update(product) {
   const query = { _id: new ObjectId(product._id) };
   const newValues = {
      $set: {
         descripcion: product.descripcion,
         precio: product.precio,
         marca: product.marca,
      },
   };
   const commandResult = await Connection.db.db("ejemplo_tp2").collection("products").updateOne(query, newValues);
   if (commandResult.result.n != 1) {
      throw new Error("No se actualizo el producto");
   }
   return product;
}

async function removeById(id) {
   const result = await Connection.db
      .db("ejemplo_tp2")
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });
   if (result.deletedCount != 1) {
      throw new Error("No se elimino el producto");
   }
   return id;
}

async function getById(id) {
   const idPorParametro = new ObjectId(id);
   const product = await Connection.db.db("ejemplo_tp2").collection("products").findOne({ _id: idPorParametro });
   return product;
}

module.exports = { getAll, create, update, removeById, getById };
