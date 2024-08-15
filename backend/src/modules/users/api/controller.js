import CustomController from "../../../libraries/customs/controller.js";
import validateFields from "../../../libraries/utils/validatefiels.js";
import Service from "../logic/service.js";
import AppError from '../../../config/AppError.js';

export default class Controller extends CustomController {
  constructor() {
    super(new Service);
    this.requieredfield = {
      register: ['first_name', 'last_name', 'email', 'password'],
      login: ['email', 'password'],
    }
  }

  getUserSession = (req, res) => res.sendSuccess(req.user)

  currentUpdate = async (req, res, next) => {
    try{
      let { updateUser } = req.body
      const updatedUser = await this.service.update(req.user._id, updateUser)
      res.sendSuccess(updatedUser)
    } catch(error) {
      next(error)
    }
  }

  // SESSION TRADICIONAL
  register = async (req, res, next) => {
    try{
      const userData = validateFields(req.body, this.requieredfield.register);
      await this.service.register(userData)
      res.sendCreated({}, "Registro exitoso")
    } catch(error) {
      next(error)
    }
  }

  login = async (req, res, next) => {
    try{
      const userData = validateFields(req.body, this.requieredfield.login);

      const {name, token} = await this.service.login(userData)
      res.sendSuccess({token}, `Log In exitoso con: ${name}`);
    } catch(error) {
      next(error)
    }
  }

  // RECUPERACION DE CONTRASEÑA
  userRecovery = async (req, res, next) => {   
    try{
      const { email } = req.body
      const resp = await this.service.userRecovery(email)
      res.sendSuccess(resp)
    } catch(error) {
      next(error)
    }
  }

  userRecoveryPassword = async (req, res, next) => {
    try{
      let { password } = req.body
      await this.service.updatePassword(req.user._id, password)
      res.sendSuccess("User updated")
    } catch(error) {
      next(error)
    }
  }

  // SUBIR FOTO PERFIL
  uploadPhoto = async (req, res, next) => {
    try {
      const filePath = req.file ? req.file.path.split('public').join('') : null
      await this.service.updatePhoto(req.user.id, filePath)
      res.sendSuccess("Photo uploaded")
    } catch (error) {
      next(error)
    }
  }
}