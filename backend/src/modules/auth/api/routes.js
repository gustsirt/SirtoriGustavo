import { Router } from "express";
import Controller from "./controller.js";
import { clients, handleAuth, users } from "../../../middleware/handlePolicies.js";
import validSchema from "./validation.js";
import { celebrate } from "celebrate";
import passport from 'passport'

const router = Router();
const controller = new Controller()

// http://localhost:8080/v1/auth/

router
.post   ('/register',       celebrate(validSchema.register), controller.register)
.post   ('/login',          celebrate(validSchema.login),    controller.login)
.post   ('/userrecovery',   celebrate(validSchema.email),    controller.userRecovery)
.put    ('/userrecovery',   handleAuth(users), celebrate(validSchema.updatePassword), controller.userRecoveryPassword)

// LinkedIn
router
.get    ('/linkedin', controller.autorize)
.get    ('/linkedin/callback', controller.redirect)

export default router

 // https://github.com/alexmarinmendez/linkedin-signin-with-openid