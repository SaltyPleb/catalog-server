"use strict";

const { Type, Brand } = require("../../models/models");
const constants = require("../consts");
const unique_from_array = require("../helpers/uniqe_from_array");

const brandsFill = () => {
  constants.TYPES_CONST.map(async (item) => {
    const curretTypeData = await Type.findOne({
      where: { name: item.type },
    });

    Promise.resolve(unique_from_array(item.dataFile)).then((result) => {
      try {
        result.map(({ dep, brand }) => {
          const brands = Brand.bulkCreate(
            [{ name: brand, dep: curretTypeData.id }],
            {
              ignoreDuplicates: true,
            }
          );
        });
      } catch (error) {
        console.error(error);
      }
    });
  });
};

module.exports = brandsFill;
