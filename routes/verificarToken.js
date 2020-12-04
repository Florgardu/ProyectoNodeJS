// Middleware de verificar token
const config = require("../config");
const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
   const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
   try {
      const tokenDecoded = jwt.verify(token, config.secret);
      req.userId = tokenDecoded.id;
      next();
   } catch (error) {
      return res.status(401).json({
         message: error,
      });
   }
}
module.exports = verificarToken;
