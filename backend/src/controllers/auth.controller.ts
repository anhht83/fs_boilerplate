import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import passwordEncrypt from "../utils/passwordEncrypt";
import APIError from "../utils/APIError";
import TokenService from "../services/token.service";
import { User } from "../models/user";

class AuthController {
  // route /auth/register
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.create(req.body);
      return res.status(httpStatus.CREATED).json(user);
    } catch (error) {
      return next(error);
    }
  }

  // route /auth/login
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      // get user with password
      const user = await User.findOne({
        where: { email }
        //attributes: "" // get all attributes, include password
      });
      // throw error if the user is not existed or the password doesn't match
      if (!user || !passwordEncrypt.check(password, user.password)) {
        throw new APIError({
          status: httpStatus.UNAUTHORIZED,
          message: "Incorrect email or password"
        });
      } else {
        // generate token to return to the client
        const token = await TokenService.generateToken(user);
        return res.json({
          id: user.id,
          email: user.email,
          token
        });
      }
    } catch (error) {
      return next(error);
    }
  }
}

export default AuthController;
