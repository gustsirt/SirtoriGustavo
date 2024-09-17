import AppError from "../../../config/AppError.js";
import cloudinary from "../../../config/cloudinary.js";
import CustomController from "../../../libraries/customs/controller.js";
import Service from "../logic/service.js";
import fs from 'node:fs'

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
      // Verificar si el archivo está presente
      if (!req.file) { new AppError("No file provided", 400) }

      // Opciones comunes para la carpeta en Cloudinary
      const options = {folder: "users"}

      // Verificar si el archivo está almacenado en memoria o en disco
      // Si el archivo está en memoria (buffer), subirlo directamente
      // Sino user el archivo está en disco, por usar la ruta para subirlo y luego elimianrlo
      if (req.file.buffer) {

        cloudinary.uploader.upload_stream(options, async (error, result) => {
          if (error) return next(error);
          const secureUrl = result.secure_url;
          await this.service.updatePhoto(req.user._id, secureUrl)
          res.sendSuccess({photoUrl: secureUrl}, "Photo uploaded")
        }).end(req.file.buffer);

      } else {
        const filePath = req.file.path;
        const result = await cloudinary.uploader.upload(filePath, options);
        const secureUrl = result.secure_url;
        await this.service.updatePhoto(req.user._id, secureUrl);
        fs.unlinkSync(filePath);
        res.sendSuccess({photoUrl: secureUrl}, "Photo uploaded")
      }

    } catch (error) {
      next(error)
    }
  }
}