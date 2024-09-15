import CustomController from "../../../libraries/customs/controller.js";
import Service from "../logic/service.js";

export default class Controller extends CustomController {
  constructor() {
    super(new Service);
  }

  getUserSession = (req, res) => res.sendSuccess(req.user)

  getAssociates =  async (req, res) => {
    try {
      const associates = await this.service.get({public: true}, true) 
      res.sendSuccess(associates)
    } catch (error) {
      next(error)
    }
  }

  getAssociate =  async (req, res) => {
    try {
      const { username } = req.params
      const associate = await this.service.getBy({username: username}, true) 
      res.sendSuccess(associate)
    } catch (error) {
      next(error)
    }
  }

  currentUpdate = async (req, res, next) => {
    try{
      let { updateUser } = req.body
      const updatedUser = await this.service.update(req.user._id, updateUser)
      res.sendSuccess(updatedUser)
    } catch(error) {
      next(error)
    }
  }

  // SUBIR FOTO PERFIL
  uploadPhoto = async (req, res, next) => {
    try {
      const filePath = req.file ? req.file.path.split('public').join('') : null
      await this.service.updatePhoto(req.user._id, filePath)
      res.sendSuccess("Photo uploaded")
    } catch (error) {
      next(error)
    }
  }
}