const express = require("express");
const router = express.Router();
const userRepository = require("../data/user");
const jwt = require("jsonwebtoken");
const config = require("../config");
const chalk = require("chalk");
const { now } = require("../util/time");

router.post("/login", async (req, res, next) => {
   const { email, password } = req.body;
   const user = await userRepository.getByEmail(email);

   if (!user) {
      return res.status(404).send(`No existe usuario con mail: ${email}`);
   }
   const passValida = await userRepository.validarPasswordBcrypt(email, password);

   if (!passValida) {
      return res.status(404).send(`Contraseña incorrecta`);
   }

   // Creacion de token al logearse
   const token = jwt.sign({ id: user._id, rol: user.rol }, config.secret, { expiresIn: "7d" });

   // Aviso por consola del login
   console.log(chalk.black.bgCyan(now(), `Usuario: "${user.username}" conectado`));

   // Respuesta enviando token
   res.json({ autorizacion: true, token: token, mensaje: "Sesión inciada" });
});

router.post("/signin", async (req, res, next) => {
   const { email } = req.body;
   const userEnBase = await userRepository.getByEmail(email);
   const user = req.body;
   user.rol = "customer";

   if (userEnBase != null) {
      res.status(400).send("Este usuario ya existe");
   } else {
      try {
         await userRepository.create(user);

         // Aviso por consola de creacion de un nuevo usuario
         console.log(chalk.black.bgGreen(now(), `Usuario: "${user.username}" creado`));

         res.json({ autorizacion: true, mensaje: "Usuario registrado, inicie sesion para obtener un token" });
      } catch (error) {
         res.status(500).send(error);
      }
   }
});

router.get("/:id", async (req, res) => {
   const userId = req.params.id;
   const data = await userRepository.getById(userId);
   res.json(data);
}); 

module.exports = router;
