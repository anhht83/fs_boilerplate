import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../models/user";

const vars = require("./vars");
const jwtOptions = {
  secretOrKey: vars.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer")
};

const jwt = async (payload: any, done: any) => {
  try {
    const user = await User.findByPk(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

export default {
  jwt: new Strategy(jwtOptions, jwt)
};
