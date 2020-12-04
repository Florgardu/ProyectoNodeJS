const express = require("express");
const router = express.Router();
const pedidosRepository = require("../data/pedido");
const verificarAdminRol = require("./verificarAdminRol");


// GET Todos los pedidos
router.get("/", async (req, res) => {
   console.log(req.query)
   const userIdFromRequest = req.query.userId;
   console.log(userIdFromRequest)
   if(userIdFromRequest){
      if(req.userId != userIdFromRequest){
         res.status(400).send("No puedes acceder a pedidos que no hayas generado tu mismo.");
         return;
       }
       const data = await pedidosRepository.getByUserId(userIdFromRequest);
       res.json(data);
   }else{
      const data = await pedidosRepository.getAll();
      res.json(data);
   }
 });

router.get("/:id", async (req, res) => {
   const pedidoId = req.params.id;
   const data = await pedidosRepository.getById(pedidoId);
   res.json(data);
}); 

 // Agregar un pedidoo
router.post("/", async (req, res) => {
    const pedido = req.body;

    if(req.userId != pedido.idCustomer){
      res.status(400).send("id customer no valido");
      return;
    }

    try {
       const result = await pedidosRepository.create(pedido);
       if(result.insertedCount == 1){
          res.status(201).send("El pedido se agrego a pedidos");
       }else{
          res.status(500).send("Error al intentar agregar el pedido");
       }
    } catch (error) {
       res.status(500).send(error);
    }
 });

// Eliminacion de pedido
router.delete("/:id", verificarAdminRol, async (req, res) => {
    try {
       const result = await pedidosRepository.removeById(req.params.id);
       res.json({"mensaje": "Se elimino el pedido con ID: " + result});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
 });

 module.exports = router;
