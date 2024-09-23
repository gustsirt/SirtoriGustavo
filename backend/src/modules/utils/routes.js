import { Router } from "express";

import { LANGUAJES, PROFESSIONS } from "./valueList.js";
import { handleAuth, users } from "../../middleware/handlePolicies.js";

const router = Router();

// http://localhost:8080/v1/values/

router
.get    ('/languajes',   handleAuth(users), (req, res) => res.sendSuccess(LANGUAJES))
.get    ('/professions', handleAuth(users), (req, res) => res.sendSuccess(PROFESSIONS))

export default router