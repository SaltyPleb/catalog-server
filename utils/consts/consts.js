const description_consts = require("./description.consts");

module.exports = Object.freeze({
  TYPES_CONST: [
    {
      type: "CPU",
      dataFile: require("../data/processors.json"),
      description: description_consts.CPU_DES,
    },
    {
      type: "GPU",
      dataFile: require("../data/gpu.json"),
      description: description_consts.GPU_DES,
    },
    {
      type: "Motherboard",
      dataFile: require("../data/motherboard.json"),
      description: description_consts.MOTHERBOARD_DES,
    },
    {
      type: "RAM",
      dataFile: require("../data/ram.json"),
      description: description_consts.RAM_DES,
    },
    {
      type: "Storage",
      dataFile: require("../data/storage.json"),
      description: description_consts.STORAGE_DES,
    },
    {
      type: "Cooling(CPU)",
      dataFile: require("../data/cooling_cpu.json"),
      description: description_consts.COOLING_CPU_DES,
    },
    {
      type: "Power supply",
      dataFile: require("../data/power_supply.json"),
      description: description_consts.POWER_SUPPLY_DES,
    },
    {
      type: "Case",
      dataFile: require("../data/case.json"),
      description: description_consts.CASE_DES,
    },
  ],
});
