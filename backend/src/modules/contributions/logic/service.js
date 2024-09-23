import CustomService from "../../../libraries/customs/service.js";
import ThisDaoMongo from "../data/dao.mongo.js";
import AppError from "../../../config/AppError.js";
import DaoUsers from "../../users/data/dao.mongo.js";

export default class Service extends CustomService {
  constructor() {
    super(new ThisDaoMongo);
    this.daoUsers = new DaoUsers();
  }

  isValidUser = async (filter) => {
    const isValidUser = await this.daoUsers.exists(filter)
    if (!isValidUser) throw new AppError("El usuario no existe", 400)
    return !!isValidUser
  }
}