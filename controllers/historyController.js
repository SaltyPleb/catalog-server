const { Favorite, Device, History } = require("../models/models");
const ApiError = require("../error/ApiError");
const onlyUnique = require("../utils/helpers/only_unique");

class historyController {
  async getAll(req, res) {
    try {
      const history = await History.findAll();
      return res.json(history);
    } catch (e) {
      console.error(ApiError.internal(e.message));
    }
  }

  async getByUserId(req, res) {
    const convertArrayToObject = (array, key) => {
      const initialValue = {};
      return array.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: item,
        };
      }, initialValue);
    };

    try {
      const { id } = req.params;
      const history = await History.findAll({
        where: { userId: id },
      });
      let allDates = [];
      
      history.map((item) => {
        let getDate = item.createdAt.toString().slice(0, 10);
        allDates.push(getDate);
      });

      var uniqueDates = allDates.filter(onlyUnique);
      let arrRess = [];

      uniqueDates.map((item) => {
        let filledArray = [];

        history.map((row) => {
          if (row.createdAt.toString().slice(0, 10) == item) {
            filledArray.push(row);
          }
        });
        arrRess.push({
          date: item,
          values: filledArray,
        });
      });

      return res.json(arrRess.reverse());
    } catch (e) {
      console.error(ApiError.internal(e.message));
    }
  }
}

module.exports = new historyController();
