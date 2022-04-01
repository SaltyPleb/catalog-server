const { Brand, Device, DeviceInfo } = require("../../models/models");
const searchClient = require("../imageSearch");

const cpuFill = (row, index, rawData) => {
    row = rawData[Math.floor(Math.random()*rawData.length)];

    var brandId = 1;
    if (!row.name.match(/(\w+)/)[0] == "AMD") {
      brandId = 1;
    } else {
      brandId = 2;
    }

    const brand = Brand.bulkCreate([{ name: row.name.match(/(\w+)/)[0], dep: 1 }], {
      ignoreDuplicates: true,
    });

    searchClient.searchImage(row.name).then(async (result) => {
      const device = await Device.bulkCreate(
        [
          {
            name: row.name,
            price: Math.round(Number(row.price_usd)),
            brandId,
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
        "core_count",
        "core_clock",
        "boost_clock",
        "tdp",
        "smt",
      ];

      const curretDevice = await Device.findOne({
        where: { name: row.name }
      })

      deviceInfo.forEach((item) =>
        DeviceInfo.create({
          title: item,
          description: row[item],
          deviceId: Number(curretDevice.id),
        })
      );


    });

    console.log(`device ${index} ${row.name} created`);
}
module.exports = cpuFill