const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  User,
  Basket,
  Device,
  DeviceInfo,
  Type,
  Brand,
} = require("../models/models");
const fs = require("fs");

const searchClient = require("./imageSearch");
const cpuFill = require("./executors/cpuFill");
const gpuFill = require("./executors/gpuFill");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

const test = async () => {
  try {
    const hashPassword = await bcrypt.hash("admin", 5);
    const user = await User.bulkCreate(
      [
        {
          email: "admin",
          role: "ADMIN",
          password: hashPassword,
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    const basket = await Basket.create({ userId: user.id });
    const token = await generateJwt(user.id, user.email, user.role);
    
    console.log(token);

    let cpuData = require("./data/processors.json");
    let gpuData = require("./data/gpu.json")

    const type = await Type.bulkCreate([{ name: "CPU" }], {
      ignoreDuplicates: true,
    });

    await Promise.all(cpuData.slice(0, 10).map((row, index) => {
      cpuFill(row, index, cpuData)
    }));

    await Promise.all(gpuData.slice(0, 10).map((row, index) => {
      gpuFill(row, index, gpuData)
    }));
    
  } catch (err) {
    console.error(err);
  }
};

test();
