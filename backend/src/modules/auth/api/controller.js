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
      await this.service.register(userData)
      res.sendCreated({}, "Registro exitoso")
    } catch(error) {
      next(error)
    }
  }

  login = async (req, res, next) => {
    try{
      const { name, token } = await this.service.login(req.body);
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

  // LINKEDIN
  autorize = async (req, res, next) => {
    res.redirect(Authorization())
  }
  redirect = async (req, res, next) => {
    const response = await Redirect(req.query.code)
    if (!response) return res.redirect('/')
      console.log(response);
    req.user = response
    res.sendSuccess(response)
  }
}