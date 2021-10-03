const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1]; // bearer asdjbajsd
      if (!token) {
        return res.status(401).json({ message: "Not authorized" });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if(decoded.role !== role){
        res.status(403).json({ message: "You dont't have access to this page" });
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: "Not authorized" });
    }
  };
};
