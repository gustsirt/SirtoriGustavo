import configEnv from "../../../config/env.js";
import CustomService from "../../../libraries/customs/service.js";
import ThisDaoMongo from "../data/dao.mongo.js";
import AppError from "../../../config/AppError.js";


export default class Service extends CustomService {
  constructor() {
    super(new ThisDaoMongo);
    this.admins = configEnv.uadmins || []
    this.admin_pass = configEnv.uadmin_pass
  }

  get = async (filter, excludePassword = true )  => await this.dao.get   (filter, excludePassword)
  getBy = async (filter, excludePassword = true) => await this.dao.getBy (filter, excludePassword)

  // ACTUALIZACION DE IMAGEN
  updatePhoto = async (uid, path) => {
    return await this.dao.update({_id: uid}, {photo: path})
  }
}