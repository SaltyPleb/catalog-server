const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class brandController {
  async create(req, res, next) {
    try {
      const { name, dep } = req.body;
      const brand = await Brand.create({ name, dep });
      return res.json(brand);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
}

module.exports = new brandController();
