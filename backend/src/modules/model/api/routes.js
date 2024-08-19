import { Router } from "express";
import Controller from "./controller.js";
import { clients, handleAuth, users } from "../../../middleware/handlePolicies.js";
import validSchema from "./validation.js";
import { celebrate } from "celebrate";

const router = Router();
const controller = new Controller()

// http://localhost:8080/v1/users/

// sesions
router
.get   ('/',       handleAuth(users), controller.get)
.get   ('/:eid',   handleAuth(users), controller.getById)
.post  ('/',       handleAuth(users), celebrate(validSchema.example),  controller.create)
.put   ('/:eid',   handleAuth(users), controller.updateId)
.delete('/:eid',   handleAuth(users), controller.deleteId)

export default router