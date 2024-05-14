const { comparePassword } = require("../helper/bcryptPassword");
const { createToken } = require("../helper/jwt");
const {User} = require("../models");
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client()


class UserController {
  static async register(req, res, next) {
    try {
      await User.create(req.body);
      res.status(201).json({ message: `your account created successfully` });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: `noEmail` };
      if (!password) throw { name: `noPassword` };
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) throw { name: `invalid` };
      const isPasswordTrue = comparePassword(password, user.password);
      if (!isPasswordTrue) throw { name: `invalid` };
      const access_token = createToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: "416693996743-tg2t33nnf8rcrt0hk92eadfiabcthufh.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          firstName: payload.given_name,
          lastName: payload.family_name,
          email: payload.email,
          password: (Math.random() * 10000).toString(),
        },
      });
      let token = createToken({ id: user.id });
      res.status(200).json({ access_token: token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController