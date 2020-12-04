// Middleware de verificar rol de Admin
const config = require("../config");
const jwt = require("jsonwebtoken");

function verificarAdminRol(req, res, next) {
   const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
   try {
      const tokenDecoded = jwt.verify(token, config.secret);
      req.userId = tokenDecoded.id;
      req.rol= tokenDecoded.rol;
      if (req.rol == "admin") {
         next();
      } else {
         return res.status(401).json({
            message: "no tiene permisos de admin"
        });
      }
   } catch (error) {
      console.log(error)
      return res.status(401).json({
         message: error
         
     });
   }
}
module.exports = verificarAdminRol;
