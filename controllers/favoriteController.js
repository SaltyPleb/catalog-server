const { Favorite } = require("../models/models");
const ApiError = require("../error/ApiError");

class favoriteController {
  async create(req, res, next) {
    try {
      const { device_name, device_link, userId } = req.body;
      const favorite = await Favorite.create({ device_name, device_link, userId });
      return res.json(favorite);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const favorite = await Favorite.findAll();
    return res.json(favorite);
  }
}

module.exports = new favoriteController();