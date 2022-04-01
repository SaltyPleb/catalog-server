const { Brand, Device, DeviceInfo } = require("../../models/models");
const searchClient = require("../imageSearch");

const gpuFill = (row, index, rawData) => {
    row = rawData[Math.floor(Math.random()*rawData.length)];

    const brand = Brand.bulkCreate([{ name: row.name.match(/(\w+)/)[0], dep: 1 }], {
        ignoreDuplicates: true,
      });
}
module.exports = gpuFill