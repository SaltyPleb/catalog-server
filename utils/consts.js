module.exports = Object.freeze({
  TYPES_CONST: [
    { type: "CPU", dataFile: require("./data/processors.json") },
    { type: "GPU", dataFile: require("./data/gpu.json") },
    { type: "Motherboard", dataFile: require("./data/motherboard.json") },
    { type: "RAM", dataFile: require("./data/ram.json") },
    { type: "Storage", dataFile: require("./data/storage.json") },
    { type: "Cooling(CPU)", dataFile: require("./data/cooling_cpu.json") },
    { type: "Power supply", dataFile: require("./data/power_supply.json") },
    { type: "Case", dataFile: require("./data/case.json") },
  ],
  BRANDS_CONST: [],
});
