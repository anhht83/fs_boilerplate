import { Request, Response, NextFunction } from "express";
import { Basic } from "../models/basic";

class BasicController {
  // fetch list of BASIC
  static async fetchBasics(req: Request, res: Response, next: NextFunction) {
    const basics = await Basic.findAll();
    return res.json(basics);
  }

}

export default BasicController;
