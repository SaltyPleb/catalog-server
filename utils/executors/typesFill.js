const { Type } = require("../../models/models");
const constants = require("../consts/consts");

const typesFill = () => {
  constants.TYPES_CONST.map((item) => {
    const type = Type.bulkCreate([{ name: item.type }], {
      ignoreDuplicates: true,
    });
  });
};

module.exports = typesFill;
