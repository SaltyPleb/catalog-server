const jwt = require("jsonwebtoken");
const { Device, History } = require("../models/models");

module.exports = function () {
  return async function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
          return res.status(401).json({ message: "Not authorized" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const deviceId = req.originalUrl.split("/")[3];

        const currentDevice = await Device.findOne({
          where: { id: deviceId },
        });

        const createHistory = History.bulkCreate(
          [{ userId: decoded.id, link: `${req.headers.referer}catalog/device/${currentDevice.id}`, device: currentDevice.name, favorite: false}],
          {
            ignoreDuplicates: true,
          });
      } catch (e) {
        console.error(e);
        res.status(401).json({ message: "Huston! We had some problems." });
      }
    }
    next();
  };
};
