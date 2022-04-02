"use strict";

const { Type, Brand, Device, DeviceInfo } = require("../../models/models");
const unique_from_array = require("../helpers/uniqe_from_array");
const searchClient = require("../imageSearch");

const gpuFill = (row, index, rawData) => {
  row = rawData[Math.floor(Math.random() * rawData.length)];

  const type = Type.bulkCreate([{ name: "GPU" }], {
    ignoreDuplicates: true,
  });

  Promise.resolve(unique_from_array(rawData)).then((result) => {
    result.map(({ dep, brand }) => {
      const brands = Brand.bulkCreate([{ name: brand, dep: 2 }], {
        ignoreDuplicates: true,
      });
    });
  });

  searchClient
    .searchImage(`${row.chipset} ${row.name}`)
    .then(async (result) => {
      const device = await Device.bulkCreate(
        [
          {
            name: `${row.chipset} ${row.name}`,
            price: Math.round(Number(row.price_usd)),
            brandId: 1,
            typeId: 1,
            img: result,
            desc: `This processor ratings count is ${row.rating_count} and rating is ${row.rating} stars`,
          },
        ],
        {
          ignoreDuplicates: true,
        }
      );

      const deviceInfo = [
        "name",
        "chipset",
        "memory",
        "core_clock",
        "boost_clock",
        "color",
        "length",
        "rating_count",
      ];

      const curretDevice = await Device.findOne({
        where: { name: `${row.chipset} ${row.name}` },
      });

      deviceInfo.forEach((item) =>
        DeviceInfo.create({
          title: item,
          description: row[item],
          deviceId: Number(curretDevice.id),
        })
      );
    });
};
module.exports = gpuFill;
