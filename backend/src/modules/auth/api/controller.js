import AppError from "../../../config/AppError.js";
import CustomController from "../../../libraries/customs/controller.js";
import { Authorization, Redirect } from "../config/authLinkedIn.js";
import Service from "../logic/service.js";

export default class Controller extends CustomController {
  constructor() {
    super(new Service);
  }

  // SESSION TRADICIONAL
  register = async (req, res, next) => {
    try{
      const { token } = await this.service.register(req.body)
      res.sendCreated({token}, "Sign In success")
    } catch(error) {
      next(error)
    }
  }

  login = async (req, res, next) => {
    try{
      const { name, token } = await this.service.login(req.body);
      res.sendSuccess({token}, `Log In success with: ${name}`);
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

  // LINKEDIN
  autorize = async (req, res, next) => {
    res.redirect(Authorization())
  }

  redirect = async (req, res, next) => {
    try{
      const profile = await Redirect(req.query.code)
      if (!profile) {
        throw new AppError("LinkedIn authorization Error", 401);
      }
      const { token } = await this.service.registerOrLogin(profile, "Linkedin")
      res.sendCreated({token}, "Auth success")
    } catch(error) {
      next(error)
    }
  }
}