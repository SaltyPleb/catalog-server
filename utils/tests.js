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
    const token = generateJwt(user.id, user.email, user.role);
    console.log(token);

    let jsonData = require("./data/processors.json");

    const type = await Type.bulkCreate([{ name: "CPU" }], {
      ignoreDuplicates: true,
    });

    await Promise.all(jsonData.map((row, index) => {
      var brandId = 1;
      if (!row.name[0] == "AMD") {
        brandId = 1;
      } else {
        brandId = 2;
      }

      const brand = Brand.bulkCreate([{ name: row.name[0], dep: 1 }], {
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

        deviceInfo.forEach((item) =>
          DeviceInfo.create({
            title: item,
            description: row[item],
            deviceId: device.id,
          })
        );


      });

      console.log(`device ${index} created`);
    }));
  } catch (err) {
    console.error(err);
  }
};

test();
