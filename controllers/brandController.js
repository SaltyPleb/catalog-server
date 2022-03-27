const { Brand, Device } = require("../models/models");
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

  async getOne(req, res) {
    const {id} = req.params;
    const brand = await Brand.findOne({
      where: {id},
      include: [{model: Device, as: "device"}]
    });
    return res.json(brand);
  }
}

module.exports = new brandController();
