"use strict";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Type, Brand, Device, DeviceInfo } = require("../../models/models");
const searchClient = require("../imageSearch");
const constants = require("../consts/consts");

const devicesFill = (limit) => {
  constants.TYPES_CONST.map(async ({ type, dataFile, description }) => {
    await Promise.all(
      dataFile.slice(0, limit).map(async (row, index) => {
        row = dataFile[Math.floor(Math.random() * dataFile.length)];

        const curretType = await Type.findOne({
          where: { name: type },
        });

        const curretBrand = await Brand.findOne({
          where: { name: row.name.match(/(\w+)/)[0] },
        });

        searchClient.searchImage(row.name).then(async (result) => {
          const device = await Device.bulkCreate(
            [
              {
                name: row.name,
                price: Math.round(Number(row.price_usd)),
                brandId: curretBrand.id,
                typeId: curretType.id,
                img: result,
                desc: `This processor ratings count is ${row.rating_count} and rating is ${row.rating} stars`,
              },
            ],
            {
              ignoreDuplicates: true,
            }
          );

          const curretDevice = await Device.findOne({
            where: { name: { [Op.substring]: row.name } },
          });
  
          description.forEach(async (item) => {
            await DeviceInfo.create({
              title: item,
              description: row[item],
              deviceId: Number(curretDevice.id),
            });
          });
        });

        console.log(`Device ${row.name} with brand id ${curretBrand.id} and type id ${curretType.id} created successfully`)
      })
    );
  });
};

module.exports = devicesFill;
