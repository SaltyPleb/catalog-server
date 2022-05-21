const { Favorite, Device } = require("../models/models");
const ApiError = require("../error/ApiError");

class favoriteController {
  async create(req, res, next) {
    try {
      const { device_name, device_link, userId, deviceId } = req.body;
      const favorite = await Favorite.create({
        device_name,
        device_link,
        userId,
        deviceId,
      });
      return res.json(favorite);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    try {
      const favorite = await Favorite.findAll();
      return res.json(favorite);
    } catch (e) {
      return res.json(ApiError.internal(e.message));
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const favorite = await Favorite.findAll({
        where: { userId: id },
        include: [{ model: Device, as: "device" }],
      });
      return res.json(favorite);
    } catch (e) {
      return res.json(ApiError.internal(e.message));
    }
  }
}

module.exports = new favoriteController();
