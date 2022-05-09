const { Favorite, Device, History } = require("../models/models");
const ApiError = require("../error/ApiError");

class historyController {
  async getAll(req, res) {
    const history = await History.findAll();
    return res.json(history);
  }

  async getByUserId(req, res) {
    const {id} = req.params
    const history = await History.findAll({
        where: {userId: id}
    });
    return res.json(history);
  }
}

module.exports = new historyController();