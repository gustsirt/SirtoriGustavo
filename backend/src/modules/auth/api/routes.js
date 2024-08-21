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
// .get    ('/linkedin', passport.authenticate('linkedin'))
// .get    ('/linkedin/callback', 
//   passport.authenticate('linkedin', {
//     //successRedirect: '/home',  // Redirige al perfil después de la autenticación
//     failureRedirect: '/'     // Redirige al login en caso de fallo
//   }),
//   (req, res) => {
//     // Si la autenticación es exitosa, redirigir al perfil del usuario
//     res.redirect('/profile');  
//   }
// );


export default router

 // https://github.com/alexmarinmendez/linkedin-signin-with-openid