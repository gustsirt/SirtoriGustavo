import configEnv from "../../../config/env.js";
import CustomService from "../../../libraries/customs/service.js";
import ThisDaoMongo from "../data/dao.mongo.js";
import AppError from "../../../config/AppError.js";

export default class Service extends CustomService {
  constructor() {
    super(new ThisDaoMongo);
  }
}