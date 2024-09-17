import { Router } from "express";
import Controller from "./controller.js";
import { clients, handleAuth, users } from "../../../middleware/handlePolicies.js";
import { uploader } from "../../../middleware/multer.js";
import { celebrate } from "celebrate";

const router = Router();
const controller = new Controller()

// http://localhost:8080/v1/users/

router
// public
.get    ('/associates', controller.getAssociates)
.get    ('/associate/:username', controller.getAssociate)

// user
.get    ('/current',        handleAuth(users),   controller.getUserSession)
.put    ('/current/update', handleAuth(users),   controller.currentUpdate)
.put    ('/current/uploadphoto',  
  handleAuth(users), 
  uploader(5, ['image/jpeg', 'image/png'], true).single('photo'),
  controller.uploadPhoto)
  
// Admins
.get    ('/',               handleAuth(['ADMIN']), controller.get)

export default router