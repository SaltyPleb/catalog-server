"use strict";

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
const typeFill = require("./executors/typesFill");
const brandFill = require("./executors/brandsFill");
const devicesFill = require("./executors/devicesFill");

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

    console.log(`new user token: ${token}`);

    typeFill();

    brandFill();
    
    // deviceFill has limit params, thats indicate how many devices will be created for each type
    devicesFill(2);

  } catch (err) {
    console.error(err);
  }
};

test();
