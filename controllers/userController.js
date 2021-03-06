const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class userController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Incorrect email or password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("User are allready existing"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("User with that name not found"));
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Incorrect password"));
    }

    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });

    // res.json('kjgfdnhjgnhdfjug')
    // const { id } = req.query;

    // if (!id) {
    //   return next(ApiError.badRequest("no ID"));
    // }

    // res.json(id);

    // If we type in router http://localhost:5000/api/user/auth?id=5&messege=kdsngjnd (messega after ?) that give us json file in curret page
  }

  async getUsers(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async changeRole(req, res, next) {
    try {
      const { email, role } = req.body;
      const users = await User.findOne({ where: {email} });
      users.set({ role: role });
      await users.save();
      return res.json(users);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new userController();
